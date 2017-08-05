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

            //TODO: These calls must be moved to backend due to XMLHttpRequest error

            var url = 'https://maps.googleapis.com/maps/api/place/details/' +
                'json?placeid=' + placeId +
                '&key=' + 'AIzaSyDTKeMGhvu0jabXMmqlQK1_kue5NIrgXbk';
            //TODO: destroy this key and set as var in heroku instead
            return $http.get(url);
        }

        function findPlaceByTextSearch(searchText, modelRef) {

            //TODO: These calls must be moved to backend due to XMLHttpRequest error

            var url = 'https://maps.googleapis.com/maps/api/place/textsearch/' +
                    'json?query=' + searchText +
                    '&key=' + 'AIzaSyDTKeMGhvu0jabXMmqlQK1_kue5NIrgXbk';
            //TODO: destroy this key and set as var in heroku instead
            return $http.get(url);
           /*
           Alternative: Using googles javascript library

           var request = {
                query : searchText
            };
            var map = new google.maps.Map(document.createElement('div'))
            var service = new google.maps.places.PlacesService(map);
            service.textSearch(request, function() {
                return result;
            });*/
        }
    }
})();