var mongoose = require("mongoose");
var reviewSchema = mongoose.Schema({
    text: String,
    rating: {type: Number, min: 0, max: 5},
    _user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModelProject"},
    _place: {type: mongoose.Schema.Types.ObjectId, ref:"PlaceModelProject"},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "review"});
module.exports = reviewSchema;