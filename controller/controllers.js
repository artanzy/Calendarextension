RoomManager.controller('roomsController', function($scope ,$mdDialog ,$mdToast ,$location ,$window ,$cookies ,roomServices) {
    console.log("Roomcontroller called");
    $scope.nameFilter = null;
    $scope.roomsList = [];
    $scope.filterList = [];
    $scope.selected = -1;
    $scope.username = "";
    $scope.password = "";
    $scope.errorMessage = "";
    $scope.startTime = "";
    $scope.endTime = "";
    $scope.interfaceStartTime = "";
    $scope.interfaceEndTime = "";
    $scope.oldStartTime = "";
    $scope.oldEndTime = "";
    $scope.filter = [];
    $scope.amenitiesSelectedList = [];
    $scope.amenitiesList = [];
    $scope.activeFilter = false;

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
          $scope.filterList = response.data.filterList;
          $scope.amenitiesList = [];
          for(i in $scope.filterList.amenities){
              var element = $scope.filterList.amenities[i];
              $scope.amenitiesList.push({name : element, selected : false});
          }
          console.log($scope.amenitiesList);
          console.log($scope.roomsList);
        }, function (error) {
          console.log("Unable to load data");
          $scope.logout();
        });
    }

    setInterval($scope.getRooms,60000);

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

    $scope.selectRoom = function(room){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id,{method: "selectRoom", param: room.roomName+", "+room.buildingName+", "+room.floor+" Floor."});
        });
        $scope.active($scope.roomsList.indexOf(room));
    }

    $scope.active = function(index){
        $scope.selected = index;
    }

    $scope.filterAction = function() {
        $scope.activeFilter = !$scope.activeFilter;
    }

    $scope.toggle = function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id,"toggle");
        });
    }

    chrome.runtime.onMessage.addListener(function(msg, sender){
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
        }
        else if(msg.method == "endTime"){
            $scope.$apply(function(){
            $scope.endTime = msg.param;
            if($scope.endTime != $scope.oldEndTime){
                $scope.getRooms();
                $scope.oldEndTime = $scope.endTime;
            }
          });
        }
        else if(msg.method == "interfaceStartTime"){
            $scope.interfaceStartTime = msg.param;
        }
        else if(msg.method == "interfaceEndTime"){
            $scope.interfaceEndTime = msg.param;
        }
    });

    $scope.checkamenitiesSelected = function(){
        for(i in $scope.amenitiesList){
            if($scope.amenitiesList[i].selected && $scope.amenitiesSelectedList.indexOf($scope.amenitiesList[i]) == -1){
                $scope.amenitiesSelectedList.push($scope.amenitiesList[i].name);
            }
        }
    }

    $scope.searchFilter = function(item){
        var filtered = false;
        $scope.amenitiesSelectedList = [];
        $scope.checkamenitiesSelected();
          if($scope.filter.roomNameSearch === undefined || item.roomName.toUpperCase().indexOf($scope.filter.roomNameSearch.toUpperCase()) >= 0) {
              if(!$scope.filter.buildingSelected || item.buildingName == $scope.filter.buildingSelected.name) {
                 if(!$scope.filter.floorSelected || item.floor == $scope.filter.floorSelected){
                    if(!$scope.filter.capacitySelected || item.roomCapacity > parseInt($scope.filter.capacitySelected.split('-')[0])){
                      for (j in $scope.amenitiesSelectedList) {
                        if (item.amenities.indexOf($scope.amenitiesSelectedList[j]) == -1) {
                          filtered = false;
                          return filtered;
                        }
                      }
                      filtered = true;
                    }
                  }
               }
           }
        return filtered;
    };

});
