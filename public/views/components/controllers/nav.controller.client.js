(function() {
    angular
        .module("WbdvProject")
        .controller("NavController", NavController)

    function NavController(GooglePlaceService) {
        var model = this;

        model.findPlaceByTextSearch = findPlaceByTextSearch;

        function init() { console.log(model.user); }
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