"use strict";
swaggerGE.controller("PathModalController", ["$scope", "PathService",
  function($scope, PathService){

    var vm = this;

    vm.newPath = {
      name:null,
      operations:{
        post:false,
        get:false,
        put:false,
        delete:false,
      }
    }

    vm.prevent = {
      pathCreation: false,
    }

    $scope.closePathModal = false;

    /*
        Add a new path object to the array containing all the paths
    */
    vm.addPath = function(pathName, operation){
      try{
        PathService.addPath(pathName);
      }catch(e){
        console.log(e);
        Materialize.toast('Not a unique name!', 2000);
      }
        for(var operation in vm.newPath.operations){

            if(vm.newPath.operations[operation]){
              console.log("CURRENT OP");
              console.log(operation);
              console.log(vm.newPath.operations);

              try{
                PathService.addOperation(pathName, operation)
              }catch(e){
                console.log(e);
              }
            }

        }


        vm.newPath = {
          name:null,
          operations:{
            post:false,
            get:false,
            put:false,
            delete:false,
          }
        };

        vm.prevent.pathCreation = true;

        $scope.closePathModal = true;

    };


}]);
