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
                controllerAs: "model",
                resolve: {
                    lkjqwelqw: checkLogin
                }
            })
            .when("/user/:uid/place/:pid", {
                templateUrl: "views/place/templates/place.view.client.html",
                controller: "PlaceController",
                controllerAs: "model"
            })
            .when("/user/:uid/search", {
                templateUrl: "views/search/templates/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            //Proof of Concept Pages
            .when("/poc", {
                templateUrl: "views/poc/templates/search.view.client.html",
                controller: "POCSearchController",
                controllerAs: "model"
            })
            .when("/poc/place/:pid", {
                templateUrl: "views/poc/templates/place.view.client.html",
                controller: "POCPlaceController",
                controllerAs: "model"
            })
            //Default Route
            .otherwise({
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
    }

    function checkLogin(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .checkLogin()
            .then(function (user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url("/login");
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();