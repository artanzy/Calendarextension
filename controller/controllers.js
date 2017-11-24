RoomManager.controller('roomsController', function($scope ,$mdDialog ,$mdToast ,$location ,$window ,$cookies ,roomServices) {
    console.log("Roomcontroller called");
    $scope.nameFilter = null;
    $scope.roomsList = [];
    $scope.bgImg = "/assets/images/bg.jpg";
    $scope.imgPath = "/assets/images/no_image.png";
    $scope.username = "";
    $scope.password = "";
    $scope.errorMessage = "";
    $scope.startTime = "";
    $scope.endTime = "";
    $scope.oldStartTime = "";
    $scope.oldEndTime = "";

    $scope.checkCookies = function(){
        console.log("checkCookies");
        if($cookies['token'] != null && $cookies['token'] != undefined && $cookies['token'] != ""){
            console.log($cookies['token']);
            console.log("already have cookies");
            window.location.href = "#/home";
        }
    }

    $scope.getRooms = function(){
        roomServices.getRooms($scope,$cookies).then(function(response){
          console.log("getRoom");
          $scope.roomsList = response.data.accessibleRoom;
          console.log($scope.roomsList);
        }, function (error) {
          console.log("Unable to load data");
          $scope.logout();
        });
    }

    $scope.login = function(){
        roomServices.postLogin($scope).success(function(response){
            console.log(response);
            $cookies['token'] = response.accessToken;
            window.location.href = "#/home";
        }).error(function(error){
            $scope.errorMessage = "login failed wrong username or password";
        });
    }

    $scope.logout = function(){
        $cookies['token'] = "";
        console.log($cookies['token']);
        window.location.href = "#/login";
    }

    $scope.toggle = function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id,"toggle");
        });
    }

    chrome.runtime.onMessage.addListener(function(msg, sender){
        // console.log(msg);
        if(msg.param === null){
        //debugging
        }
        else if(msg.method == "startTime"){
            $scope.$apply(function(){
            $scope.startTime = msg.param;
            if($scope.startTime != $scope.oldStartTime){
                $scope.getRooms();
                $scope.oldStartTime = $scope.startTime;
            }
          });
          // console.log($scope.startTime);
        }
        else if(msg.method == "endTime"){
            $scope.$apply(function(){
            $scope.endTime = msg.param;
            if($scope.endTime != $scope.oldEndTime){
                $scope.getRooms();
                $scope.oldEndTime = $scope.endTime;
            }
          });
          // console.log($scope.endTime);
        }

    });


});
