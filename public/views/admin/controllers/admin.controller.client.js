(function() {
    angular
        .module("WbdvProject")
        .controller("AdminController", AdminController)

    function AdminController($scope, $timeout, $routeParams, $location, UserService, PlaceService, user) {
        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        model.pageNeedsSearch = true;

        function init() {
            UserService
                .findAllUsers()
                .then(function(response) {
                    model.users = response.data;
                });
            PlaceService
                .findAllPlaces()
                .then(function(response) {
                    model.places = response.data;
                    model.places.forEach(function(place){
                        place.dateCreated = new Date(place.dateCreated);
                    });
                });
        }
        init();

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function() {
                });
        }


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