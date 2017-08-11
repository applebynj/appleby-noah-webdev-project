(function() {
    angular
        .module("WamApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }
        init();

        function registerUser(user) {
            UserService
                .findUserByUsername(user.username)
                .then(function(res) {
                    var _user = res.data;
                    if(!_user) {
                        if(user.password === user.password2) {
                            return UserService.createUser(user).then(function(res) {
                                _user = res.data;
                                $location.url("/user/" + _user._id);
                            });
                        } else {
                            model.error = "Passwords do not match";
                        }
                    }
                    else {
                        model.error = "User already exists";
                    }
                })
        }
    }
})();