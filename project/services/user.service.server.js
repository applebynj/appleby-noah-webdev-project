var app = require("../../express");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var userModel = require("../models/user/user.model.server");

app.post("/api/user", createUser);
app.post("/api/user", findUser); /* covers findUserByUserName and findUserByCredentials based on request body */
app.post("/api/login", passport.authenticate('local'), login);
app.get("/api/user/:userId", findUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.put("/api/user/:userId/place/:placeId", addPlaceToUser);
app.get("/api/checkLogin", checkLogin)

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
    console.log('here');
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
            res.statusCode(404).send(err);
        });
}

function login(req, res) {
    res.json(req.user);
}

function findUser(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    /* findUserByCredentials */
    if(username && password) {
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByCredentials(username, password)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                res.statusCode(404).send(err);
            });
    } /* findUserByUserName */
    else if(username) {

        userModel
            .findUserByUsername(username)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                res.statusCode(404).send(err);
            });

    }  else {
        res.statusCode(404);
    }
}

function findUserById(req, res) {
    var userId = req.params.userId;

    userModel
        .findUserById(userId)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.statusCode(404).send(err);
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
            res.statusCode(404).send(err);
        })
}

function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function(status) {
            res.json(status);
        }, function(err) {
            res.statusCode(404).send(err);
        })
}

function addPlaceToUser(req, res) {
    var userId = req.params.userId;
    var placeId = req.params.placeId;

    userModel
        .addPlace(userId, placeId)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.statusCode(404).send(err);
        });
}