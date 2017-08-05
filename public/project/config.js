(function() {
    angular
        .module("WbdvProject")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/poc", {
                templateUrl: "views/poc/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/poc/place/:pid", {
                templateUrl: "views/poc/templates/place.view.client.html",
                controller: "PlaceController",
                controllerAs: "model"
            })
            //Default Route
            .otherwise({
                templateUrl: "views/poc/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
    }
})();