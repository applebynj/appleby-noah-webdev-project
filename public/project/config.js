(function() {
    angular
        .module("WbdvProject")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            //Proof of Concept Pages
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
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
    }
})();