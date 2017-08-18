(function() {
    angular
        .module("WbdvProject")
        .factory("PlaceService", PlaceService);

    function PlaceService($http) {

        var api = {
            'createPlace' : createPlace,
            'findPlaceById' : findPlaceById,
            'findAllPlacesForUser' : findAllPlacesForUser,
            'findAllPlaces' : findAllPlaces,
            'deletePlace' : deletePlace
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

/*      Ultimately unused:
        function findPlaceByAPIId(place_id) {
            var url = "/api/place/" + place_id;
        }*/

        function findAllPlacesForUser(userId) {
            var url = '/api/user/' + userId + "/place";
            return $http.get(url);
        }

        function findAllPlaces() {
            var url = "/api/place/all";
            return $http.get(url);
        }

        function deletePlace(placeId) {
            var url ="/api/place/" + placeId;
            return $http.delete(url);
        }
    }
})();