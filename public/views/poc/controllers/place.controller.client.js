(function() {
    angular
        .module("WbdvProject")
        .controller("POCPlaceController", POCPlaceController)

    function POCPlaceController($routeParams, GooglePlaceService) {
        var model = this;

        model.placeId = $routeParams["pid"];

        function init() {
            GooglePlaceService
                .findPlaceById(model.placeId)
                .then(function(response) {
                    console.log(response.data.result);
                    model.place = response.data.result;
                })
        }
        init();
    }
})();