(function() {
    angular
        .module("WbdvProject")
        .controller("PlaceController", PlaceController)

    function PlaceController(PlaceService) {
        var model = this;

        function init() {
            //TODO: get place by ID and set as place in model
        }
        init();
    }
})();