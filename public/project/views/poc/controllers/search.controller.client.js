(function() {
    angular
        .module("WbdvProject")
        .controller("SearchController", SearchController)

    function SearchController(PlaceService) {
        var model = this;

        function init() { }
        init();

        function findPlaceByTextSearch(searchText) {
            //TODO
        }
    }
})();