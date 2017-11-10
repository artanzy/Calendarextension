RoomManager.controller('roomsController', function($scope ,$mdDialog ,$mdToast ,roomServices) {
    console.log("Roomcontroller called");
    $scope.nameFilter = null;
    $scope.roomsList = [];
    $scope.id = "";
    $scope.name = "";
    $scope.imageFile = "";
    $scope.imgPath = "/assets/images/no_image.png";
    $scope.capacity = "";
    $scope.building = "";
    $scope.floor = "";
    $scope.startDate = "";


    $scope.getRooms = function(){
        roomServices.getRooms().then(function(response){
          console.log("getRoom");
          $scope.roomsList = response.data;
        }, function (error) {
          log.error("Unable to load data");
        });
    }

    $scope.getRooms();

    $scope.showcreateRoom = function(event){
        $mdDialog.show({
          controller: DialogController,
          templateUrl: '/dialog/createroomdialog.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          scope: $scope,
          preserveScope: true,
          fullscreen: true // Only for -xs, -sm breakpoints.
        });
    }

    function DialogController($scope, $mdDialog) {
      $scope.cancel = function() {
          $mdDialog.cancel();
      };
      $scope.hide = function() {
          $mdDialog.hide();
      };
    }

    $scope.createRoom = function(){
    roomServices.createRoom($scope).then(function successCallback(response){
        console.log("create room success");
        $scope.getRooms();
        $scope.cancel();
        $scope.clearRoomForm();
      });
    }

    $scope.clearRoomForm = function(){
      $scope.id = "";
      $scope.name = "";
      $scope.capacity = "";
      $scope.building = "";
      $scope.floor = "";
    }

    $scope.readOne = function(id){

      roomServices.readOne(id).then(function successCallback(response){

        $scope.id = response.data._id;
        $scope.name = response.data.roomName;
        $scope.imgPath = response.data.roomImage;
        $scope.capacity = response.data.roomCapacity;
        $scope.building = response.data.buildingName;
        $scope.floor = response.data.floor;

        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/dialog/readroomdialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true
        }).then(
            function(){},

            // user clicked 'Cancel'
            function() {
                // clear modal content
                $scope.clearRoomForm();
            }
        );

      }, function errorCallback(response){
          $scope.showToast("Unable to retrieve record.");
      });

  }

  $scope.updateRoom = function(){
      roomServices.updateRoom($scope).then(function successCallback(response){
          $scope.getRooms();
          $scope.cancel();
          $scope.clearRoomForm();
      });
  }

  $scope.confirmDeleteRoom = function(id){

      $scope.id = id;

      var confirm = $mdDialog.confirm()
          .title('Are you sure?')
          .textContent('Room will be deleted.')
          .ok('Yes')
          .cancel('No');

      $mdDialog.show(confirm).then(
          function() {
              $scope.deleteRoom();
          },

          function() {
          }
      );
  }

  $scope.deleteRoom = function(){
      roomServices.deleteRoom($scope.id).then(function successCallback(response){
          $scope.getRooms();
      });
  }


});
