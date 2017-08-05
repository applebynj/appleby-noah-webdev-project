(function() {
    angular
        .module("WbdvProject")
        .controller("SearchController", SearchController)

    function SearchController(PlaceService) {
        var model = this;

        model.findPlaceByTextSearch = findPlaceByTextSearch;

        function init() { }
        init();

        function findPlaceByTextSearch(searchText) {
            model.result = PlaceService.findPlaceByTextSearch(searchText);
        }
    }
})();