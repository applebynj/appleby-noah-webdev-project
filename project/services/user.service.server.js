var app = require("../../express");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));


passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var userModel = require("../models/user/user.model.server");

app.post("/api/user", createUser);
app.get("/api/user", findUser); /* covers findUserByUserName and findUserByCredentials based on request body */
app.get("/api/user/all", findAllUsers);
app.post("/api/login", passport.authenticate('local'), login);
app.post("/api/logout", logout);
app.get("/api/user/:userId", findUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.put("/api/user/:userId/place/:placeId", addPlaceToUserVisited);
app.delete("/api/user/:userId/place/:placeId", removePlaceFromUserVisited);
app.put("/api/user/:userId/follow/:followUserId", followUser);
app.delete("/api/user/:userId/follow/:unfollowUserId", unfollowUser);
app.get("/api/checkLogin", checkLogin);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#/user',
        failureRedirect: '/#/login'
    }));

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function createUser(req, res) {
    /* TODO: further validation */
    var user = req.body;

    userModel
        .createUser(user)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(404).send(err);
        });
}

function login(req, res) {
    res.json(req.user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function findUser(req, res) {
    var username = req.query.username;
    if(username) {
        userModel
            .findUserByUsername(username)
            .then(function(user) {
                    res.json(user);
            }, function(err) {
                res.status(404).send(err);
            });

    }  else {
        res.status(404);
    }
}

function findAllUsers(req, res) {

    userModel
        .findAllUsers()
        .then(function(users) {
            res.json(users);
        }, function(err) {
            res.status(404).send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params.userId;

    userModel
        .findUserById(userId)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(404).send(err);
        });
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function(status) {
            res.json(status);
        }, function(err) {
            res.status(404).send(err);
        })
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function(status) {
            res.json(status);
        }, function(err) {
            res.status(404).send(err);
        })
}

function addPlaceToUserVisited(req, res) {
    var userId = req.params.userId;
    var placeId = req.params.placeId;

    userModel
        .addPlace(userId, placeId)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(404).send(err);
        });
}

function removePlaceFromUserVisited(req, res) {
    var userId = req.params.userId;
    var placeId = req.params.placeId;

    userModel
        .removePlace(userId, placeId)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(404).send(err);
        });
}

function followUser(req, res) {
    var userId = req.params.userId;
    var followUserId = req.params.followUserId;

    userModel
        .followUser(userId, followUserId)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(404).send(err);
        });
}

function unfollowUser(req, res) {
    var userId = req.params.userId;
    var unfollowUserId = req.params.unfollowUserId;

    userModel
        .unfollowUser(userId, unfollowUserId)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.status(404).send(err);
        });
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}
