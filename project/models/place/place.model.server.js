var mongoose = require("mongoose");
var placeSchema = require("./place.schema.server");
var db = require("../models.server");
var userModel = require("../user/user.model.server");

var placeModel = mongoose.model("PlaceModelProject", placeSchema);

placeModel.createPlace = createPlace;
//placeModel.findUserById = findUserById;
placeModel.findAllPlacesForUser = findAllPlacesForUser;
placeModel.findPlace = findPlace;
placeModel.updatePlace = updatePlace;
//userModel.deleteUser = deleteUser;

module.exports = placeModel;

function createPlace(place) {
    return placeModel.create(place);
}

function findPlace(place) {
    return placeModel.findOne({place_id : place.place_id});
}

function updatePlace(placeId, place) {
    return placeModel.findOneAndUpdate({_id : placeId},
        {$set: place});
}

function findAllPlacesForUser(userId) {
    return userModel.findUserById(userId)
        .populate('placesVisited')
        .then(function(user) {
            console.log(user);
            return user.placesVisited;
        })
}

