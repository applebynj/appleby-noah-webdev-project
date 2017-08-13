(function() {
    angular
        .module("WbdvProject")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, $location, UserService, PlaceService) {
        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        model.userId = $routeParams["uid"];

        function init() {
            UserService
                .findUserById(model.userId)
                .then(function(response) {
                    model.user = response.data;
                    PlaceService
                        .findAllPlacesForUser(model.user._id)
                        .then(function(res) {
                            model.places = res.data;
                        })
                });
        }
        init();

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function() {
                    $location.url("user/" + user._id);
                })
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function() {
                    $location.url("/login");
                })
        }
    }
})();