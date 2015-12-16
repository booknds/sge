swaggerGE.controller("PathController", ['$scope', 'PathService', 'swaggerCompiler', '$window',
  function($scope, swaggerPaths, swaggerCompiler, $window){

     "use strict";

     var vm = this;

    //$scope.thisObject = vm;

    //used to test the services
    vm.paths = swaggerPaths.paths;

    vm.prevent = {
      showPaths:false,
    }

    vm.focusPathModal = false;

    //$scope.closePathModal = false;


  /*  vm.togglePaths = function(){
      //make sure there are paths to show
      if($scope.paths.length > 0)
          $scope.prevent.pathsList = !$scope.prevent.pathsList;
    }*/
    vm.focusPathModal = function(){
      $scope.focusPathModal = !$scope.focusPathModal;
    }

    vm.updatePathName = function(originalPathName, newPathName){
      try{
        swaggerPaths.updatePathName(originalPathName, newPathName);
        //delete the old pathName saved on the Object
        //delete vm[originalPathName];
        vm[newPathName]="";
      }catch(e){
        console.log(e);
        Materialize.toast(e, 3000);
      }
    }

    vm.deletePath = function(pathName){
      if($window.confirm('Are you sure you want to delete the path?')){

        try{
          swaggerPaths.removePath(pathName);
        }catch(e){
          console.log(e);
          Materialize.toast(e, 3000);
        }
        //  swaggerPaths.deleteOperation(pathName, operation);

          //delete path.pathDefinition[pathName][operation];

      }else{
          //angular
          console.log('DONT DELETE');
          //path.currentPathOperations[operation] = !path.currentPathOperations[operation];

      }
    }

/**---------  START Operation methods ---------**/

    vm.deleteOperation = function(pathName, operation){
      //if the operation exists delete it

        if($window.confirm('Are you sure you want to delete the ' + operation + ' operation?')){

            swaggerPaths.removeOperation(pathName, operation);

            //delete path.pathDefinition[pathName][operation];

      }else{
        console.log("dont delete operation");
      }
    };

    vm.addOperation = function(pathName, operation){
      try{
        swaggerPaths.addOperation(pathName, operation);
      }catch(e){
        console.log(e);
        Materialize.toast(e, 3000);
      }
    };

    vm.updateOperation = function(pathName, operation, key, value){
      swaggerPaths.updateOperationInformation(pathName, operation, key, value);
      value="";
      Materialize.toast("Updated " + key, 2000);
    };



}]);
