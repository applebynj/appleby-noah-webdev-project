var app = require("../../express");

var placeModel = require("../models/user/place.model.server");

app.post("/project/api/place", createPlace);
app.get("/project/api/user/:userId/place", findAllPlacesForUser);
//app.get("/project/api/place/:placeId", findPlaceById);
//app.put("/project/api/place/:placeId", updatePlace);
//app.delete("/project/api/place/:placeId", deletePlace)


function createPlace(req, res) {
    /* TODO: further validation */
    var place = req.body;

    placeModel
        .createPlace(place)
        .then(function(place) {
            res.json(place);
        }, function(err) {
            res.statusCode(404).send(err);
        });
}

function findAllPlacesForUser(req, res) {
    var userId = req.params.userId;

    placeModel
        .findAllPlacesForUser(userId)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.statusCode(404).send(err);
        });
}