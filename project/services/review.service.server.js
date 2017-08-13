var app = require("../../express");

var reviewModel = require("../models/review/review.model.server");

app.post("/project/api/review", createReview);
app.get("/project/api/place/:placeId/review", findAllReviewsForPlace);
//app.get("/api/user/:userId", findUserById);
//app.put("/api/user/:userId", updateUser);
//app.delete("/api/user/:userId", deleteUser)

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