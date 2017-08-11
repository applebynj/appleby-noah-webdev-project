(function() {
    angular
        .module("WamApp")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, $location, UserService) {
        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        model.userId = $routeParams["uid"];

        function init() {
            UserService
                .findUserById(model.userId)
                .then(function(response) {
                    model.user = response.data;
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