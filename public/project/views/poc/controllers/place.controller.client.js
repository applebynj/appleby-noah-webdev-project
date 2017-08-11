(function() {
    angular
        .module("WbdvProject")
        .controller("PlaceController", PlaceController)

    function PlaceController($routeParams, GooglePlaceService) {
        var model = this;

        model.placeId = $routeParams["pid"];

        function init() {
            GooglePlaceService
                .findPlaceById(model.placeId)
                .then(function(response) {
                    model.place = response.data.result;
                })
        }
        init();
    }
})();