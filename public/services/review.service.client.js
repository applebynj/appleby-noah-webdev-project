(function() {
    angular
        .module("WbdvProject")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api = {
            'createReview' : createReview,
            'deleteReview' : deleteReview,
            'findAllReviewsForPlace' : findAllReviewsForPlace
        };
        return api;

        function createReview(review) {
            var url = '/api/review';
            return $http.post(url, review);
        }

        function deleteReview(reviewId) {
            var url ="/api/review/" + reviewId;
            return $http.delete(url);
        }

        function findAllReviewsForPlace(placeId) {
            var url = '/api/place/' + placeId + "/review";
            return $http.get(url);
        }
    }
})();