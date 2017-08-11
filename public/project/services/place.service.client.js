(function() {
    angular
        .module("WbdvProject")
        .factory("PlaceService", PlaceService);

    function PlaceService($http) {

        var api = {
            // 'findPlaceById' : findPlaceById,
            'findAllPlacesForUser' : findAllPlacesForUser
        };
        return api;

        // function findPlaceById(placeId) {
        //     var url = '/project/api/place/' + placeId;
        //     return $http.get(url);
        // }

        function findAllPlacesForUser(userId) {
            var url = '/project/api/user/' + userId + "/place";
            return $http.get(url);
        }
    }
})();