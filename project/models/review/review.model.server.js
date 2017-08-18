var mongoose = require("mongoose");
var db = require("../models.server");
var userModel = require("../user/user.model.server");
var placeModel = require("../place/place.model.server");

var reviewSchema = require("./review.schema.server");
var reviewModel = mongoose.model("ReviewModel", reviewSchema);

reviewModel.createReview = createReview;
//reviewModel.findReview = findReview;
//reviewModel.updateReview = updateReview;
//reviewModel.deleteReview = deleteReview;
//reviewModel.findReviewById = findReviewById; (not needed yet)
reviewModel.findAllReviewsForPlace = findAllReviewsForPlace;

module.exports = reviewModel;

function createReview(review) {
    return reviewModel.create(review);
}

function findAllReviewsForPlace(placeId) {
    return reviewModel.find({_place: placeId})
        .populate('_user', 'username');
}

