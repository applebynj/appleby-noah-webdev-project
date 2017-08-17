var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    bio: String,
    homeState: String,
    //TODO: likely don't need this relationship, no value to order unless making top list
    placesVisited: [{type: mongoose.Schema.Types.ObjectId, ref:"PlaceModel"}],
    usersFollowing: [{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
    isAdmin: Boolean,
    birthday: {type: Date},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});
module.exports = userSchema;