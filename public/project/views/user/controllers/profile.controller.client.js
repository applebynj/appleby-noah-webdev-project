(function() {
    angular
        .module("WbdvProject")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, $location, UserService, PlaceService, user) {
        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.followUser = followUser;
        model.unfollowUser = unfollowUser;
        model.hoverOut = function() { this.applyClass = "btn-success";
                                    this.hover = false;};
        model.hoverIn = function() {this.applyClass = "btn-danger";
                                    this.hover = true;};

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
                });
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function() {
                    $location.url("/login");
                });
        }

        function getPlacesForUser() {
            PlaceService
                .findAllPlacesForUser(model.user._id)
                .then(function(res) {
                    model.places = res.data;
                });
        }

        /* Logged in user will follow user of page */
        function followUser() {
            UserService
                .followUser(user._id, model.user._id)
                .then(function(userDoc){
                    user = userDoc.data;
                    checkIfFollowing();
                });
        }

        /* Logged in user will follow user of page */
        function unfollowUser() {
            UserService
                .unfollowUser(user._id, model.user._id)
                .then(function(userDoc){
                    user = userDoc.data;
                    checkIfFollowing();
                });
        }

        function checkIfFollowing(){
            model.following = user.usersFollowing.filter(
                function(el) {
                    return el._id === model.user._id;
                })[0];
        }
    }
})();