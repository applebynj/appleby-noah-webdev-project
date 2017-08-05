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
            var url = 'https://maps.googleapis.com/maps/api/place/details/' +
                'json?placeid=' + placeId +
                '&key=' + 'AIzaSyDTKeMGhvu0jabXMmqlQK1_kue5NIrgXbk';
            //TODO: destroy this key and set as var in heroku instead
            return $http.get(url);
        }

        function findPlaceByTextSearch(searchText) {
            var url = 'https://maps.googleapis.com/maps/api/place/textsearch/' +
                    'json?query=' + searchText +
                    '&key=' + 'AIzaSyDTKeMGhvu0jabXMmqlQK1_kue5NIrgXbk';
            //TODO: destroy this key and set as var in heroku instead
            return $http.get(url);
        }
    }
})();