var mongoose = require("mongoose");
var placeSchema = require("./place.schema.server");
var db = require("../models.server");
var userModel = require("../user/user.model.server");

var placeModel = mongoose.model("PlaceModel", placeSchema);

placeModel.createPlace = createPlace;
placeModel.findPlace = findPlace;
placeModel.updatePlace = updatePlace;
placeModel.deletePlace = deletePlace;
//placeModel.findPlaceById = findPlaceById; (not needed yet)
placeModel.findAllPlacesForUser = findAllPlacesForUser;
placeModel.findAllPlaces = findAllPlaces;

module.exports = placeModel;

function createPlace(place) {
    return placeModel.create(place);
}

function findPlace(place) {
    return placeModel.findOne({place_id : place.place_id});
}

function updatePlace(placeId, place) {
    return placeModel.findOneAndUpdate({_id : placeId},
        {$set: place},
        { 'new': true });
}

function deletePlace(placeId) {
    return placeModel.remove({_id: placeId});
}

function findAllPlacesForUser(userId) {
    return userModel.findUserById(userId)
        .populate('placesVisited')
        .then(function(user) {
            return user.placesVisited;
        })
}

function findAllPlaces() {
    return placeModel
        .find({})
        .select('name dateCreated place_id');
}
