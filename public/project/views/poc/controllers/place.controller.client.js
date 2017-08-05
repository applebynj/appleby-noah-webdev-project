(function() {
    angular
        .module("WbdvProject")
        .controller("PlaceController", PlaceController)

    function PlaceController(PlaceService) {
        var model = this;

        model.placeId = $routeParams["pid"];

        function init() {
            model.place = PlaceService.findPlaceById(model.placeId);
        }
        init();
    }
})();