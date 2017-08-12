(function() {
    angular
        .module("WbdvProject")
        .controller("PlaceController", PlaceController)

    function PlaceController($routeParams, GooglePlaceService, PlaceService, UserService) {
        var model = this;

        model.userId = $routeParams["uid"];
        model.placeId = $routeParams["pid"];

        model.addPlaceToUser = addPlaceToUser;

        function init() {
            GooglePlaceService
                .findPlaceById(model.placeId)
                .then(function(response) {
                    model.place = response.data.result;
                    PlaceService
                        .createPlace({  //if doesnt exist!!! TODO
                            name : model.place.name,
                            address : model.place.formatted_address,
                            place_id : model.place.place_id
                        }).then(function(place) {
                            console.log(place);
                            model.place.id = place.data._id;
                            PlaceService
                                .findAllPlacesForUser(model.userId)
                                .then(function(res) {
                                    console.log(res);
                                })
                    });
                });
        }
        init();

        function addPlaceToUser(userId, placeId) {
            console.log(placeId);
            UserService
                .addPlaceToUser(userId, placeId)
                .then(function(response) {
                    model.user = response.data;
                    model.visited = hasUserVisitedPlace(placeId);
                });
        }

        function hasUserVisitedPlace(placeId) {
            return true;
            //model.user.placesVisited go through and see if placeid exists
        }
    }
})();