(function() {
    angular
        .module("WbdvProject")
        .controller("PlaceController", PlaceController)

    function PlaceController($routeParams, GooglePlaceService, PlaceService, UserService, ReviewService) {
        var model = this;

        model.userId = $routeParams["uid"];
        model.placeId = $routeParams["pid"];

        model.addPlaceToUser = addPlaceToUser;
        model.createReview = createReview;

        function init() {
            UserService
                .findUserById(model.userId)
                .then(function(response){
                    model.user = response.data;
                    GooglePlaceService
                        .findPlaceById(model.placeId)
                        .then(function(response) {
                            model.place = response.data.result;
                            PlaceService
                                .createPlace({
                                    name : model.place.name,
                                    address : model.place.formatted_address,
                                    place_id : model.place.place_id
                                }).then(function(place) {
                                model.place._id = place.data._id;
                                checkIfUserHasVisitedPlace();
                                retrieveReviewsForPlace();
                            });
                        });
                });
        }
        init();

        function addPlaceToUser(userId, placeId) {
            UserService
                .addPlaceToUser(userId, placeId)
                .then(function(response) {
                    model.user = response.data;
                    checkIfUserHasVisitedPlace()
                });
        }

        function checkIfUserHasVisitedPlace(){
            model.visited = model.user.placesVisited.indexOf(model.place.id) >= 0;
        }

        function retrieveReviewsForPlace(){
            ReviewService
                .findAllReviewsForPlace(model.place._id)
                .then(function(reviews){
                    model.place.reviews = reviews.data;
                })
        }

        function createReview(){
            model.reviewForm.userId = model.user._id;
            model.reviewForm.placeId = model.place._id;

            ReviewService
                .createReview({
                    rating: model.reviewForm.rating,
                    text: model.reviewForm.text,
                    _user: model.user._id,
                    _place: model.place._id
                });
            retrieveReviewsForPlace();
        }
    }
})();