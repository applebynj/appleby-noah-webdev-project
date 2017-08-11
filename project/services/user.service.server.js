var app = require("../../express");

var userModel = require("../models/user/user.model.server");

app.post("/project/api/user", createUser);
app.get("/project/api/user", findUser); /* covers findUserByUserName and findUserByCredentials based on request body */
app.get("/project/api/user/:userId", findUserById);
app.put("/project/api/user/:userId", updateUser);
app.delete("/project/api/user/:userId", deleteUser)

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

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    /* findUserByCredentials */
    if(username && password) {

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