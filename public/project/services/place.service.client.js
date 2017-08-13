(function() {
    angular
        .module("WbdvProject")
        .factory("PlaceService", PlaceService);

    function PlaceService($http) {

        var api = {
            'createPlace' : createPlace,
            'findPlaceById' : findPlaceById,
            'findAllPlacesForUser' : findAllPlacesForUser
        };
        return api;

        function createPlace(place) {
            var url = '/api/place';
            return $http.post(url, place);
        }

        function findPlaceById(placeId) {
            var url = '/api/place/' + placeId;
            return $http.get(url);
        }

        function findPlaceByAPIId(place_id) {
            var url = "/api/place/" + place_id;
        }

        function findAllPlacesForUser(userId) {
            var url = '/api/user/' + userId + "/place";
            return $http.get(url);
        }
    }
})();