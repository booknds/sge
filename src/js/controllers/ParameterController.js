"use strict";
swaggerGE.controller("parameterController", ['$scope', '$log', 'PathService', "ParameterModalService",
function($scope, log, swaggerPaths, pms){

    var paramControl = this;

    //paramControl.am = {};

    paramControl.path = {
      name: null,
      operation: null,
    }

    paramControl.parametersList = null;

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

    //Param methods
    this.addParam = function(pathName, operation, paramName, paramInLocation){

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


}]);
