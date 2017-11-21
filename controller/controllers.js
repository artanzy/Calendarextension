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
            window.location.href = "#/home";
        }).error(function(error){
            $scope.errorMessage = "login failed wrong username or password";
        });
    }

    $scope.logout = function(){
        $cookies['token'] = undefined;
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
              });
              // console.log($scope.startTime);
          }
          else if(msg.method == "endTime"){
              $scope.$apply(function(){
                  $scope.endTime = msg.param;
              });
              // console.log($scope.endTime);
          }
      });


});
