(function() {
    angular
        .module("WbdvProject")
        .controller("AdminController", AdminController)

    function AdminController($scope, $timeout, $routeParams, $location, UserService, PlaceService, user) {
        var model = this;

        model.deleteUser = deleteUser;

        model.pageNeedsSearch = true;

        function init() {
            UserService
                .findAllUsers()
                .then(function(response) {
                    model.users = response.data;
                });
        }
        init();


        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function() {
                    UserService
                        .findAllUsers()
                        .then(function(response) {
                            model.users = response.data;
                        });
                });
        }
    }
})();