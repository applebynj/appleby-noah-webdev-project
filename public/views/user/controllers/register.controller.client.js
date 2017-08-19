(function() {
    angular
        .module("WbdvProject")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var model = this;

        model.registerUser = registerUser;
        model.pageNeedsSearch = true;

        function init() {

        }
        init();

        function registerUser(user) {
            UserService
                .findUserByUsername(user.username)
                .then(function(res) {
                    var _user = res.data;
                    if(!_user) {
                        if(user.password && (user.password === user.password2)) {
                            return UserService.createUser(user).then(function(res) {
                                _user = res.data;
                                login(user);
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

        function login(user) {
            if(!user) {
                model.errorMessage = "User not found";
            } else {
                UserService
                    .login(user.username, user.password)
                    .then(function(res){
                        _user = res.data;
                        if(_user === null) {
                            model.errorMessage = "User not found";
                        } else {
                            $rootScope.currentUser = _user;
                            $location.url("/user?fromLogin=true");
                        }
                    });
            }
        }
    }
})();