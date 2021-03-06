var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require("../models.server");

var userModel = mongoose.model("UserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addPlace = addPlace;
userModel.removePlace = removePlace;
userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;
userModel.findAllUsers = findAllUsers;
//userModel.removePlace = removePlace;

module.exports = userModel;

function createUser(user) {
    user.username = user.username.toLowerCase();
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel
        .findById(userId)
        .populate('usersFollowing', 'username placesVisited')
}

function findUserByUsername(username) {
    return userModel
        .findOne({username: username.toLowerCase()})
        .populate('usersFollowing', 'username');;
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username.toLowerCase(), password: password});
}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({'google.id': googleId});
}

function updateUser(userId, user) {
    return userModel.update({_id : userId},
        {$set: user});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function addPlace(userId, placeId) {
    return userModel
        .findOneAndUpdate({_id: userId},
            { $push: { placesVisited: placeId }},
            { 'new': true });
}

function removePlace(userId, placeId) {
    return userModel
        .findOneAndUpdate({_id: userId},
            { $pop: { placesVisited: placeId }},
            { 'new': true });
}

function followUser(userId, followUserId) {
    return userModel
        .findOneAndUpdate({_id: userId},
            { $push: { usersFollowing: followUserId }},
            { 'new': true })
        .populate('usersFollowing', 'username');
}

function unfollowUser(userId, unfollowUserId) {
    return userModel
        .findOneAndUpdate({_id: userId},
            { $pull: { usersFollowing: unfollowUserId }},
            { 'new': true })
        .populate('usersFollowing', 'username');
}

function findAllUsers() {
    return userModel
        .find({})
        .select('username firstName lastName dateCreated isAdmin');
}

// function removePlace(userId, websiteId) {
//     userModel
//         .findById(userId)
//         .then(function(user){
//             var index = user.websites.indexOf(websiteId);
//             user.places.splice(index, 1);
//             return user.save();
//         });
// }

