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

        function findPlaceByTextSearch() {
            //Remove all spaces TODO: remove other escape chars as it's a url param
            var searchText = model.whatSearchText + " " + model.whereSearchText;
            searchText = searchText.replace(/ /g, '+');
            GooglePlaceService
                .findPlaceByTextSearch(searchText)
                .then(function(response) {
                    model.results = response.data.results;
                })

        }
    }
})();