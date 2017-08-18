(function() {
    angular
        .module("WbdvProject")
        .controller("ProfileController", ProfileController)

    function ProfileController($scope, $timeout, $routeParams, $location, UserService, PlaceService, user) {
        var model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.followUser = followUser;
        model.unfollowUser = unfollowUser;
        model.hoverOut = function() { this.hover = false; };
        model.hoverIn = function() { this.hover = true; };

        model.usernameUrlParam = $routeParams["username"];
        model.fromLogin = $routeParams["fromLogin"];
        model.loggedIn = user != null;
        model.pageNeedsSearch = true;
        model.user=user;

        function init() {

            $scope.$watch('$viewContentLoaded', function(){
                $timeout(function() {
                    if(model.fromLogin) {
                        $('#userSettings').modal('show');
                    }
                    $.material.init();
                },0);
            });

            model.hoverOut();
            if(user && user.username === model.usernameUrlParam) {
                $location.url("/user");
            } else if(model.usernameUrlParam) {
                UserService
                    .findUserByUsername(model.usernameUrlParam)
                    .then(function(response) {
                        model.profileUser = response.data;
                        if(!model.profileUser) {
                            $location.url("/");
                        }
                        model.profileUser.dateCreated = new Date(model.profileUser.dateCreated);
                        if(model.profileUser.birthday) {
                            model.profileUser.birthday = new Date(model.profileUser.birthday);
                        }
                        getPlacesForUser();
                        checkIfFollowing();
                    });
            } else if (user) {
                model.profileUser = user;
                model.profileUser.dateCreated = new Date(model.profileUser.dateCreated);
                if(model.profileUser.birthday) {
                    model.profileUser.birthday = new Date(model.profileUser.birthday);
                }                getPlacesForUser();
                checkIfFollowing();
            } else {
                $location.url("/login");
            }
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
                    $location.url("/");
                });
        }

        function getPlacesForUser() {
            PlaceService
                .findAllPlacesForUser(model.profileUser._id)
                .then(function(res) {
                    model.places = res.data;
                });
        }

        /* Logged in user will follow user of page */
        function followUser() {
            UserService
                .followUser(user._id, model.profileUser._id)
                .then(function(userDoc){
                    user = userDoc.data;
                    checkIfFollowing();
                });
        }

        /* Logged in user will follow user of page */
        function unfollowUser() {
            UserService
                .unfollowUser(user._id, model.profileUser._id)
                .then(function(userDoc){
                    user = userDoc.data;
                    checkIfFollowing();
                });
        }

        function checkIfFollowing(){
            model.following = user.usersFollowing.filter(
                function(el) {
                    return el._id === model.profileUser._id;
                })[0];
        }
    }
})();