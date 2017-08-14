(function() {
    angular
        .module("WbdvProject")
        .factory("GooglePlaceService", GooglePlaceService);

    function GooglePlaceService($http) {

        var api = {
            'findPlaceById' : findPlaceById,
            'findPlaceByTextSearch' : findPlaceByTextSearch,
        };
        return api;

        function findPlaceById(placeId) {
            var url = '/api/google/place/' + placeId;
            return $http.get(url);
        }

        function findPlaceByTextSearch(searchText) {
            var url = '/api/google/place/search/' + searchText;
            return $http.get(url);
        }
    }
})();