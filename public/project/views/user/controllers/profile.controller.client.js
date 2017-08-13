(function() {
    angular
        .module("WbdvProject")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, $location, UserService, PlaceService, user) {
        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        model.userId = user._id;
        model.usernameUrlParam = $routeParams["username"];

        function init() {
            if(user.username === model.usernameUrlParam) {
                $location.url("/user");
            } else if(model.usernameUrlParam) {
                UserService
                    .findUserById(model.userId)
                    .then(function(response) {
                        model.user = response.data;
                    });
            } else {
                model.user = user;
            }

            PlaceService
                .findAllPlacesForUser(model.user._id)
                .then(function(res) {
                    model.places = res.data;
                })
        }
        init();

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function() {
                    $location.url("/user");
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