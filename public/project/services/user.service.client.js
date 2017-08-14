(function() {
    angular
        .module("WbdvProject")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            'createUser' : createUser,
            'findUserById' : findUserById,
            'findUserByUsername' : findUserByUsername,
            'login' : login,
            'logout' : logout,
            'updateUser' : updateUser,
            'deleteUser' : deleteUser,
            'addPlaceToUser' : addPlaceToUser,
            'followUser' : followUser,
            'unfollowUser' : unfollowUser,
            'checkLogin' : checkLogin
        };
        return api;

        function createUser(user) {
            var url = '/api/user';
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function login(username, password) {
            var url = "/api/login";
            return $http.post(url, {username: username, password: password});
        }

        function logout() {
            var url = "/api/logout";
            return $http.post(url);
        }

        function updateUser(userId, user) {
            var url ="/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url ="/api/user/" + userId;
            return $http.delete(url);
        }

        function addPlaceToUser(userId, placeId) {
            var url = "/api/user/" + userId + "/place/" + placeId;
            return $http.put(url);
        }

        function followUser(userId, followUserId) {
            var url = "/api/user/" + userId + "/follow/" + followUserId;
            return $http.put(url);
        }

        function unfollowUser(userId, unfollowUserId) {
            var url = "/api/user/" + userId + "/follow/" + unfollowUserId;
            return $http.delete(url);
        }

        function checkLogin() {
            var url = "/api/checkLogin";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();