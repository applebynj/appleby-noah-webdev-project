(function() {
    angular
        .module("WbdvProject")
        .controller("AdminController", AdminController)

    function AdminController($scope, $timeout, $routeParams, $location, UserService, PlaceService, user) {
        var model = this;

        model.deleteUser = deleteUser;

        model.pageNeedsSearch = true;

        function init() {
        }
        init();


        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function() {
                    $location.url("/login");
                });
        }
    }
})();