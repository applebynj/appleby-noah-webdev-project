(function() {
    angular
        .module("WbdvProject")
        .controller("LoginController", LoginController)

    function LoginController($location, UserService, PlaceService, $rootScope) {
        var model = this;

        model.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(!user) {
                model.errorMessage = "User not found";
            } else {
                UserService
                    .findUserByCredentials(user.username, user.password)
                    .then(function(res){
                        user = res.data;
                        if(user === null) {
                            model.errorMessage = "User not found";
                        } else {
                            $rootScope.currentUser = user;
                            $location.url("user/" + user._id);
                        }
                    });
            }
        }
    }
})();