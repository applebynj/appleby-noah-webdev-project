var mongoose = require("mongoose");
var reviewSchema = mongoose.Schema({
    text: String,
    rating: {type: Number, min: 0, max: 5},
    _user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    _place: {type: mongoose.Schema.Types.ObjectId, ref:"PlaceModel"},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "review"});
module.exports = reviewSchema;