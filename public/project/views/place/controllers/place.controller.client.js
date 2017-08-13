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
                                console.log(place);
                                console.log(model.user);
                                model.place.id = place.data._id;
                                checkIfUserHasVisitedPlace()
                            });
                        });
                });
        }
        init();

        function addPlaceToUser(userId, placeId) {
            console.log(placeId);
            UserService
                .addPlaceToUser(userId, placeId)
                .then(function(response) {
                    console.log(placeId);
                    console.log(response.data);
                    model.user = response.data;
                    checkIfUserHasVisitedPlace()
                });
        }

        function checkIfUserHasVisitedPlace(){
            model.visited = model.user.placesVisited.indexOf(model.place.id) >= 0;
        }
    }
})();