RoomManager.factory("roomServices", function($http) {

    var roomsManager = {};

    roomsManager.getRooms = function(){
        return $http.get("https://b5351a35.ngrok.io/rooms")
    };

    roomsManager.postLogin = function($scope){
        return $http({
        method: 'POST',
        data: {
            'username' : $scope.username,
            'password' : $scope.password
        },
        url: "https://b5351a35.ngrok.io/login"
      });
    };

    return roomsManager;
});
