var mongoose = require("mongoose");
var placeSchema = require("./place.schema.server");
var db = require("../models.server");
var userModel = require("../user/user.model.server");

var placeModel = mongoose.model("PlaceModelProject", placeSchema);

//placeModel.createUser = createUser;
//placeModel.findUserById = findUserById;
placeModel.findAllPlacesForUser = findAllPlacesForUser;
//userModel.updateUser = updateUser;
//userModel.deleteUser = deleteUser;

module.exports = userModel;

function findAllPlacesForUser(userId) {
    return userModel.findUserById(userId)
        .populate('placesVisited')
        .then(function(user) {
            return user.placesVisited;
        })
}

