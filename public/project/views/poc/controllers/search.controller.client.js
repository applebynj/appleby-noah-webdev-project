(function() {
    angular
        .module("WbdvProject")
        .controller("SearchController", SearchController)

    function SearchController(GooglePlaceService) {
        var model = this;

        model.findPlaceByTextSearch = findPlaceByTextSearch;

        function init() { }
        init();

        function findPlaceByTextSearch(searchText) {
            model.result = GooglePlaceService.findPlaceByTextSearch(searchText);

        }
    }
})();