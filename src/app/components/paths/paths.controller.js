import angular from 'angular';
//import main from './main.js';

"use strict";

let PathController = ['$scope', 'PathService', '$window', PathCtrl];

export default PathController;

function PathCtrl($scope, swaggerPaths, $window){
  //$scope.thisObject = this;

  //used to test the services
  this.paths = swaggerPaths.paths;

  this.prevent = {
    showPaths:false,
  }

  this.operations = ['get', 'post', 'put', 'delete'];

  this.hasOperation = function(pathName, operation){
    //debugger;
    return this.paths[pathName].hasOwnProperty(operation);
  };

  $scope.focusPathModal = false;

  $scope.openFocusPathModal = function(){
    $scope.focusPathModal = true;
    console.log("toggle focus: focusPathModal ==" + $scope.focusPathModal)
    //$scope.focusPathModal = !$scope.focusPathModal;
  }

  this.updatePathName = function(originalPathName, newPathName){
    try{
      swaggerPaths.updatePathName(originalPathName, newPathName);
      //delete the old pathName saved on the Object
      //delete this[originalPathName];
      this[newPathName]="";
    }catch(e){
      console.log(e);
      Materialize.toast(e, 3000);
    }
  }

  this.deletePath = function(pathName){
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

  this.deleteOperation = function(pathName, operation){
    //if the operation exists delete it

      if($window.confirm('Are you sure you want to delete the ' + operation + ' operation?')){

          swaggerPaths.removeOperation(pathName, operation);

          //delete path.pathDefinition[pathName][operation];

    }else{
      console.log("dont delete operation");
    }
  };

  this.addOperation = function(pathName, operation){
    try{
      swaggerPaths.addOperation(pathName, operation);
    }catch(e){
      console.log(e);
      Materialize.toast(e, 3000);
    }
  };

  this.updateOperation = function(pathName, operation, key, value){
    swaggerPaths.updateOperationInformation(pathName, operation, key, value);
    value="";
    Materialize.toast("Updated " + key, 2000);
  };



}
