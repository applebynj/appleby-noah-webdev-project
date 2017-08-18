(function() {
    angular
        .module("WbdvProject")
        .controller("NavController", NavController)

    function NavController($location, $scope, $timeout, UserService, GooglePlaceService) {
        var model = this;

        model.findPlaceByTextSearch = findPlaceByTextSearch;
        model.logout = logout;

        function init() {
            $scope.$watch('$viewContentLoaded', function(){
                $timeout(function() {
                    $.material.init();
                },0);
            });
        }
        init();

        function findPlaceByTextSearch() {
            //Remove all spaces TODO: remove other escape chars as it's a url param
            if(model.whatSearchText && model.whereSearchText) {
                var searchText = model.whatSearchText + " " + model.whereSearchText;
                searchText = searchText.replace(/ /g, '+');
                GooglePlaceService
                    .findPlaceByTextSearch(searchText)
                    .then(function(response) {
                        model.results = response.data.results;
                    })
            }
        }

        function logout() {
            console.log('lo');
            UserService
                .logout()
                .then(
                    function() { $location.url("/"); });
        }
    }
})();