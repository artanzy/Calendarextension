var RoomManager = angular.module('RoomManager', ['ngMaterial','ngRoute','ngCookies']);
console.log("roomManager create");

RoomManager.config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $routeProvider
    .when('/login', {
          templateUrl : 'login.html',
          controller : 'roomsController'
    })
    .when('/home', {
          templateUrl : 'toolbar.html',
          controller : 'roomsController'
    })
    .otherwise({
          redirectTo : '/login'
    });
}]);
