"use strict";
swaggerGE.controller("parameterController", ['$scope', '$log', 'PathService', "ParameterModalService",
function($scope, log, swaggerPaths, pms){

    //scope.ameterPath = swaggerPaths.chosenParameter;

    //scope.am;
    var paramControl = this;

    //paramControl.am = {};

    paramControl.path = {
      name: null,
      operation: null,
    }

    paramControl.operation = null;

    paramControl.initController = function(pathName, operation){
      /*paramControl.path.name = pathName;
      paramControl.path.operation = operation;

      paramControl.operation = swaggerPaths.paths[pathName][operation];
      paramControl.parametersList = paramControl.operation.parameters.parameterList*/
      //pms.parameterToUpdate(swaggerPaths.paths[pathName][operation].parameters.parameterList)

    }

    //console.log(paramControl.operation);
    //console.log(paramControl.operation.parameters);

    paramControl.swaggerPaths = swaggerPaths;

    //paramControl.path = paramControl.paths;

    paramControl.parametersList = null;
    /*{
      post: paramControl.parameters.post.parameters,
      get: paramControl.parameters.get.parameters,
      put: paramControl.parameters.put.parameters,
      delete: paramControl.parameters.delete.parameters,
    };*/

    //paramControl.parametersList = swaggerPaths.paths[pathDefinition]

    paramControl.newParamData = {
      post:{
        name:null,
        inLocation:null,
      },
      get:{
        name:null,
        inLocation:null,
      },
      put:{
        name:null,
        inLocation:null,
      },
      delete:{
        name:null,
        inLocation:null,
      },
    }

  /*  $scope.$watch("am", function(oldVal, newVal){

        log.log(oldVal + ", " + newVal);
    });*/

    $scope.$watch(function(){return swaggerPaths.updateList}, function(newVal){

      if(newVal){
        if(newVal.update){
          console.log("watchhit")
          console.log(newVal);

          updateParamList(newVal.path, newVal.operation);
          $scope.$apply();
          console.log("print updated list");
          console.log(paramControl.parametersList);
          console.log("----done---")
          swaggerPaths.updateList = {};
        }
      }

    })

  /*  $scope.$watch(function(){ return swaggerPaths.chosenParameter;}, function(newVal){
          $scope.am = newVal;
          //console.log(newVal);
          //console.log($scope.am);
          $scope.tempParam = clone($scope.currentParam);
          $scope.tempParam.schema = JSON.stringify($scope.tempParam.schema);
          console.log($scope.tempParam);
      });*/

    //Param methods
    this.addParam = function(pathName, operation, paramName, paramInLocation){

       // console.log("ADD PARAM!");
        //var pathName = path.currentName;



        try{
            swaggerPaths.addNewParam(pathName, operation, paramName, paramInLocation);
            //$scope.parametersList = swaggerPaths.getParamList;
            //updateParamList(pathName, operation);
        }catch(e){
            console.log(e);
            //paramControl.toastUser("Not a unique parameter/query combo.");
            Materialize.toast("Parameter name/query combo' already exists", 3000);
        }

        //path.pathDefinition[pathName][operation].parameters = swaggerPaths.getParamList(pathName, operation);

        paramControl.newParamData[operation].name = "";



    }

    paramControl.editParamData = function(pathName, operation, paramName, paramInLocation){

      var temp = swaggerPaths.getParam(pathName, operation, paramName, paramInLocation);

      pms.parameterToUpdate(pathName, operation, temp);

    };



    function updateParamList(pathName, operation){
      console.log("updating param list");
      console.log(pathName);
      console.log(operation);
      paramControl.parametersList[operation] = angular.copy(swaggerPaths.getParamList(pathName,operation));
      console.log(paramControl.parametersList[operation])
      console.log("----- done updating param list -----")
    }

    //$scope.$watch("")

  /*  paramControl.paramRequired = function(){

      console.log(paramControl.am);

      if(paramControl.am.required){
        console.log("required true");
        paramControl.am.required = false;
      }else{
        console.log("required false");
        paramControl.am.required = true;
      }

      console.log("updateing param required");
      console.log(paramControl.am);
    }*/


    function clone(obj) {
      // Handle the 3 simple types, and null or undefined
      if (null == obj || "object" != typeof obj){
        console.log("null or not string");
        return obj;
      }

      // Handle Date
      if (obj instanceof Date) {
        console.log("Copying Date");

          var copy = new Date();
          copy.setTime(obj.getTime());
          return copy;
      }

      // Handle Array
      if (obj instanceof Array) {
        console.log("Copying Array");
          var copy = [];
          for (var i = 0, len = obj.length; i < len; i++) {
              copy[i] = clone(obj[i]);
          }
          return copy;
      }

      // Handle Parameter
      /*if(obj instanceof swaggerPaths.Parameter) {
        console.log("Copying Parameter");
        var copy = new Parameter();
        for (var attr in obj){
          if(obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }

        return copy;
      }*/

      // Handle Object
      if (obj instanceof Object) {
        console.log("Copying Object");

          var copy = {};
          for (var attr in obj) {
              if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
          }
          return copy;
      }

      throw new Error("Unable to copy obj! Its type isn't supported.");
    }




}]);
