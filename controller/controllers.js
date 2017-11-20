RoomManager.controller('roomsController', function($scope ,$mdDialog ,$mdToast ,$location ,$window ,$cookies ,roomServices) {
    console.log("Roomcontroller called");
    $scope.nameFilter = null;
    $scope.roomsList = [];
    $scope.bgImg = "/assets/images/bg.jpg";
    $scope.imgPath = "/assets/images/no_image.png";
    $scope.username = "";
    $scope.password = "";
    $scope.errorMessage = "";

    $scope.getRooms = function(){
        roomServices.getRooms().then(function(response){
          console.log("getRoom");
          $scope.roomsList = response.data;
        }, function (error) {
          log.error("Unable to load data");
        });
    }

    $scope.getRooms();

    $scope.checkCookies = function(){
        var token = $cookies['token'];
        console.log(token);
        if(token === "login success"){
            console.log("already have cookies");
            window.location.href = "#/home";
        }
    }

    $scope.login = function(){
        roomServices.postLogin($scope).success(function(response){
            console.log(response);
            $cookies['token'] = response;
            console.log($location.path());
            window.location.href = "#/home";
        }).error(function(error){
            $scope.errorMessage = "login failed wrong username or password";
        });
    }

    $scope.logout = function(){
        $cookies['token'] = undefined;
        window.location.href = "#/login";
    }

});
