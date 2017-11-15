var RoomManager = angular.module('RoomManager', ['ngMaterial','ngRoute','ngCookies']);
console.log("roomManager create");
RoomManager.config(['$httpProvider', function($httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
}]);
