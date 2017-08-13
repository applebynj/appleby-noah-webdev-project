var mongoose = require("mongoose");
var db = require("../models.server");
var userModel = require("../user/user.model.server");
var placeModel = require("../place/place.model.server");

var reviewSchema = require("./review.schema.server");
var reviewModel = mongoose.model("ReviewModelProject", reviewSchema);

reviewModel.createReview = createReview;
//reviewModel.findUserById = findUserById;
reviewModel.findAllReviewsForPlace = findAllReviewsForPlace;
//reviewModel.findPlace = findPlace;
//reviewModel.updatePlace = updatePlace;
//reviewModel.deleteUser = deleteUser;

module.exports = reviewModel;

function createReview(review) {
    return reviewModel.create(review);
}

function findAllReviewsForPlace(placeId) {
    return reviewModel.find({_place: placeId})
        .populate('_user', 'username');
}

