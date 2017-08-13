(function() {
    angular
        .module("WbdvProject")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api = {
            'createReview' : createReview,
            'findAllReviewsForPlace' : findAllReviewsForPlace
        };
        return api;

        function createReview(review) {
            var url = '/api/review';
            return $http.post(url, review);
        }

        function findAllReviewsForPlace(placeId) {
            var url = '/api/place/' + placeId + "/review";
            return $http.get(url);
        }
    }
})();