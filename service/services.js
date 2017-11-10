RoomManager.factory("roomServices", function($http) {

    var roomsManager = {};

    roomsManager.getRooms = function(){
        return $http.get("https://b0943738.ngrok.io/rooms")
    };

    roomsManager.createRoom = function($scope){
        return $http({
        method: 'POST',
        data: {
            'roomName' : $scope.name,
            'roomImage' : $scope.imgPath,
            'roomCapacity' : $scope.capacity,
            'buildingName' : $scope.building,
            'floor' : $scope.floor
        },
        url: "https://b0943738.ngrok.io/rooms"
      });
    };

    roomsManager.readOne = function(id){
    return $http({
        method: 'GET',
        url: 'https://b0943738.ngrok.io/rooms' + id
      });
    };

    roomsManager.updateRoom = function($scope){
        return $http({
            method: 'PUT',
            data: {
                'roomName' : $scope.name,
                'roomImage' : $scope.imgPath,
                'roomCapacity' : $scope.capacity,
                'buildingName' : $scope.building,
                'floor' : $scope.floor
            },
            url: 'https://b0943738.ngrok.io/rooms' + $scope.id
        });
    };

    roomsManager.deleteRoom = function(id){
        return $http({
            method: 'DELETE',
            data: { 'id' : id },
            url: 'https://b0943738.ngrok.io/rooms' + id
        });
    };


    return roomsManager;
});
