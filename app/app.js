var RoomManager = angular.module('RoomManager', ['ngMaterial','ngRoute']);
console.log("roomManager create");
RoomManager.config(['$httpProvider', function($httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
}]);
