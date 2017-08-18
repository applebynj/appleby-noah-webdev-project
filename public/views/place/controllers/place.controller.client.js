(function() {
    angular
        .module("WbdvProject")
        .controller("PlaceController", PlaceController)

    function PlaceController($scope, $timeout, $routeParams, GooglePlaceService, PlaceService, UserService, ReviewService, user) {
        var model = this;

        model.placeId = $routeParams["pid"];

        model.addPlaceToUserVisited = addPlaceToUserVisited;
        model.removePlaceFromUserVisited = removePlaceFromUserVisited;
        model.createReview = createReview;
        model.hoverOut = function() {this.hover = false;};
        model.hoverIn = function() {this.hover = true;};
        model.loggedIn = user != null;
        model.pageNeedsSearch = true;

        function init() {

            $(document).ready(function () {
                $('.carousel').carousel()
            });

            $scope.$watch('$viewContentLoaded', function () {
                $timeout(function () {
                    $.material.init();
                }, 0);
            });

            new Drop({
                target: document.querySelector('.drop-target'),
                content: document.querySelector('.my-drop'),
                position: 'top center',
                openOn: 'hover'
            });

            model.hoverOut();

            GooglePlaceService
                .findPlaceById(model.placeId)
                .then(function (response) {
                    model.place = response.data.result;
                    PlaceService
                        .createPlace({
                            name: model.place.name,
                            address: model.place.formatted_address,
                            place_id: model.place.place_id
                        }).then(function (response) {
                            var place = response.data;
                            model.place._id = place._id;
                            if (user) {
                                UserService
                                    .findUserById(user._id)
                                    .then(function (response) {
                                        model.user = response.data;
                                        checkIfUserHasVisitedPlace();
                                        checkIfFollowsHaveVisitedPlace();
                                    });
                            }
                        retrieveReviewsForPlace();
                    });
                });
        }
        init();

        function addPlaceToUserVisited() {
            UserService
                .addPlaceToUserVisited(user._id, model.place._id)
                .then(function(response) {
                    model.user = response.data;
                    checkIfUserHasVisitedPlace()
                });
        }

        function removePlaceFromUserVisited() {
            UserService
                .removePlaceFromUserVisited(user._id, model.place._id)
                .then(function(response) {
                    model.user = response.data;
                    checkIfUserHasVisitedPlace()
                });
        }

        function checkIfUserHasVisitedPlace(){
            model.visited = model.user.placesVisited.indexOf(model.place._id) >= 0;
        }

        function checkIfFollowsHaveVisitedPlace(){
            model.followsVisited = model.user.usersFollowing.filter(function(follow){
                return follow.placesVisited.indexOf(model.place._id) !== -1;
            });
        }

        /*Overwrite the API reviews with our reviews*/
        function retrieveReviewsForPlace(){
            model.place.reviews = null; /*erase api reviews*/
            ReviewService
                .findAllReviewsForPlace(model.place._id)
                .then(function(reviews){
                    model.place.reviews = reviews.data;
                });
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