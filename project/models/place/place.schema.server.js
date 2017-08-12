var mongoose = require("mongoose");
var placeSchema = mongoose.Schema({
    name: String,
    address: String,
    place_id: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "place"});
module.exports = placeSchema;