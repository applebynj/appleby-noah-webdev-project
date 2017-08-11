var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    //TODO: likely don't need this relationship, no value to order unless making top list
    //places: [{type: mongoose.Schema.Types.ObjectId, ref:"Places"}],
    isAdmin: Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});
module.exports = userSchema;