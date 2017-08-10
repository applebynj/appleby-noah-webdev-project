(function() {
    angular
        .module("WbdvProject")
        .controller("PlaceController", PlaceController)

    function PlaceController(GooglePlaceService) {
        var model = this;

        model.placeId = $routeParams["pid"];

        function init() {
            model.place = GooglePlaceService.findPlaceById(model.placeId);
        }
        init();
    }
})();