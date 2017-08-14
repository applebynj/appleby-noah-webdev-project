(function() {
    angular
        .module("WbdvProject")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, $location, UserService, PlaceService, user) {
        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.followUser = followUser;
        model.hoverOut = function() { this.applyClass = "btn-success";
                                    this.hover = false;};
        model.hoverIn = function() {this.applyClass = "btn-danger";
                                    this.hover = true;};

        model.userId = user._id;
        model.usernameUrlParam = $routeParams["username"];

        function init() {
            model.hoverOut();
            if(user.username === model.usernameUrlParam) {
                $location.url("/user");
            } else if(model.usernameUrlParam) {
                UserService
                    .findUserByUsername(model.usernameUrlParam)
                    .then(function(response) {
                        model.user = response.data;
                        getPlacesForUser();
                        checkIfFollowing();
                    });
            } else {
                model.user = user;
                getPlacesForUser();
                checkIfFollowing();
            }
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

        function getPlacesForUser() {
            PlaceService
                .findAllPlacesForUser(model.user._id)
                .then(function(res) {
                    model.places = res.data;
                })
        }

        /* Logged in user will follow user of page */
        function followUser() {
            UserService
                .followUser(model.userId, model.user._id)
        }

        function checkIfFollowing(){
            console.log(user.usersFollowing);
            model.following = user.usersFollowing.filter(
                function(el) {
                    return el._id === model.user._id;
                });
        }
    }
})();