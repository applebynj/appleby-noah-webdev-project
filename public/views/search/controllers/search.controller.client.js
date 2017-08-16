(function() {
    angular
        .module("WbdvProject")
        .controller("SearchController", SearchController)

    function SearchController(user, GooglePlaceService) {
        var model = this;

        model.user = user;

        model.findPlaceByTextSearch = findPlaceByTextSearch;

        function init() { console.log(user);}
        init();

        function findPlaceByTextSearch(searchText) {
            //Remove all spaces TODO: remove other escape chars as it's a url param
            searchText = searchText.replace(/ /g, '+');
            GooglePlaceService
                .findPlaceByTextSearch(searchText)
                .then(function(response) {
                    model.results = response.data.results;
                })

        }
    }
})();