var mongoose = require("mongoose");
var placeSchema = require("./place.schema.server");
var db = require("../models.server");
var userModel = require("../user/user.model.server");

var placeModel = mongoose.model("PlaceModelProject", placeSchema);

placeModel.createPlace = createPlace;
//placeModel.findUserById = findUserById;
placeModel.findAllPlacesForUser = findAllPlacesForUser;
//userModel.updateUser = updateUser;
//userModel.deleteUser = deleteUser;

module.exports = placeModel;

function createPlace(place) {
    return placeModel.create(place);
}

function findAllPlacesForUser(userId) {
    return placeModel.findUserById(userId)
        .populate('placesVisited')
        .then(function(user) {
            return user.placesVisited;
        })
}

