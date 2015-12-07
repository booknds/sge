"use strict";
swaggerGE.controller("parameterController", ['$scope', '$log', 'swaggerPathsService', function($scope, log, swaggerPaths){

    //scope.currentParameterPath = swaggerPaths.chosenParameter;

    //scope.currentParam;
    var paramControl = this;

    paramControl.currentParam = {};

    paramControl.parametersList = {
      post:null,
      get:null,
      put:null,
      delete:null,
    };

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

  /*  $scope.$watch("currentParam", function(oldVal, newVal){

        log.log(oldVal + ", " + newVal);
    });*/

    $scope.$watch(function(){return swaggerPaths.updateList}, function(newVal){

      if(newVal.update && newVal){
        console.log("watchhit")
        console.log(newVal);
        paramControl.updateParamList(newVal.path, newVal.operation);
        swaggerPaths.updateList = {};
      }

    })

    //Param methods
    this.addParam = function(path, operation, paramName, paramInLocation){

       // console.log("ADD PARAM!");
        var pathName = path.currentName;



        try{
            swaggerPaths.addNewParam(pathName, operation, paramName, paramInLocation);
            //$scope.parametersList = swaggerPaths.getParamList;
            paramControl.updateParamList(pathName, operation);
        }catch(e){
            console.log(e);
            //paramControl.toastUser("Not a unique parameter/query combo.");
            Materialize.toast("Parameter name/query combo' already exists", 3000);
        }

        //path.pathDefinition[pathName][operation].parameters = swaggerPaths.getParamList(pathName, operation);

        path.newParam[operation] = "";



    }

    paramControl.initParamData = function(pathName, operation, paramName, paramInLocation){
      var tempParam = angular.copy(swaggerPaths.getParam(pathName, operation, paramName, paramInLocation));
      tempParam.originalValues = {
        path: pathName,
        operation: operation,
        name: paramName,
        inLocation: paramInLocation,
      };

      swaggerPaths.chosenParameter = tempParam;

    };


    /*paramControl.setParamIn = function(inLocation){
        paramControl.paramIn = inLocation;

    }*/

    /*paramControl.setParamInModal = function(inLocation){
      if(inLocation === 'path'){
        paramControl.tempParam.required = true;
      }
    }*/


    paramControl.updateParamList = function(pathName, operation){
      paramControl.parametersList[operation] = angular.copy(swaggerPaths.getParamList(pathName,operation));
    }

    //$scope.$watch("")

  /*  paramControl.paramRequired = function(){

      console.log(paramControl.currentParam);

      if(paramControl.currentParam.required){
        console.log("required true");
        paramControl.currentParam.required = false;
      }else{
        console.log("required false");
        paramControl.currentParam.required = true;
      }

      console.log("updateing param required");
      console.log(paramControl.currentParam);
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
