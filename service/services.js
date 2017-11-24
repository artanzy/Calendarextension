RoomManager.factory("roomServices", function($http) {

    var roomsManager = {};

    roomsManager.getRooms = function($scope,$cookies){
        console.log($cookies['token']);
        return $http.get('https://meetingdev.exzycloud.com:8899/resources?start_time='+
                          $scope.startTime+'&end_time='+$scope.endTime, { headers : { "access-token" : $cookies['token']}});
    };

    roomsManager.postLogin = function($scope){
        console.log($scope.username + " : " + $scope.password);
        return $http.post("https://meetingdev.exzycloud.com:8899/login",
        {username : $scope.username, password : $scope.password});
    };

    return roomsManager;
});
