var app = require("../../express");

var reviewModel = require("../models/review/review.model.server");

app.post("/api/review", createReview);
//app.get("/api/review/:reviewId", findReviewById); (not yet needed)
//app.put("/api/review/:reviewId", updateReview);
//app.delete("/api/review/:reviewId", deleteReview)
app.get("/api/place/:placeId/review", findAllReviewsForPlace);

function createReview(req, res) {
    var review = req.body;

    reviewModel
        .createReview(review)
        .then(function(review) {
            res.json(review);
        }, function(err) {
            res.statusCode(404).send(err);
        });
}

function findAllReviewsForPlace(req, res) {
    var placeId = req.params.placeId;

    reviewModel
        .findAllReviewsForPlace(placeId)
        .then(function(reviews) {
            res.json(reviews);
        }, function(err) {
            res.statusCode(404).send(err);
        })
}