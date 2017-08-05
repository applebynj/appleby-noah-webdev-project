(function() {
    angular
        .module("WbdvProject")
        .factory("PlaceService", PlaceService);

    function PlaceService($http) {

        var api = {
            'findPlaceById' : findPlaceById,
            'findPlaceByTextSearch' : findPlaceByTextSearch,
        };
        return api;

        function findPlaceById(placeId) {
            //TODO
        }

        function findPlaceByTextSearch(searchText) {
            //TODO
        }
    }
})();