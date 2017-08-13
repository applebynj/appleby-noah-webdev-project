var app = require("../../express");

var placeModel = require("../models/place/place.model.server");

app.post("/project/api/place", createPlace);
app.get("/project/api/user/:userId/place", findAllPlacesForUser);
//app.get("/project/api/place/:placeId", findPlaceById);
//app.put("/project/api/place/:placeId", updatePlace);
//app.delete("/project/api/place/:placeId", deletePlace)


function createPlace(req, res) {
    /* TODO: further validation */
    var place = req.body;

    /* Do not create if a place with that API id already exists, just update its info */
    placeModel
        .findPlace(place)
        .then(function(existingPlace) {
            if(existingPlace) {
                placeModel
                    .updatePlace(existingPlace._id, place)
                    .then(function(place) {
                        res.json(place);
                    }, function(err) {
                        res.statusCode(404).send(err);
                    })
            } else {
                placeModel
                    .createPlace(place)
                    .then(function(place) {
                        res.json(place);
                    }, function(err) {
                        res.statusCode(404).send(err);
                    });
            }
        }, function(err) {
            res.statusCode(404).send(err);
        });
}

function findAllPlacesForUser(req, res) {
    var userId = req.params.userId;

    placeModel
        .findAllPlacesForUser(userId)
        .then(function(places) {
            res.json(places);
        }, function(err) {
            res.statusCode(404).send(err);
        });
}