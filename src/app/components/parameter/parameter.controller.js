"use strict";

let ParameterController = ['$scope','PathService', "ParameterModalService", ParameterCtrl];

export default ParameterController;

function ParameterCtrl($scope, PathService, pms){

  this.inLocationList = ["path", "query", "header", "body", "formData"];

  this.pLength = null;

  this.addParam = function(paramName, paramInLocation){

      try{
          PathService.addNewParam(this.sgContext, paramName, paramInLocation)
      }catch(e){
          console.log(e);
          Materialize.toast("Parameter name/query combo' already exists", 3000);
      }

      //reset input data
      $scope.addParameter.$setPristine();
      resetNewParamData.call(this, this.sgThisOperation);

      this.pLength = this.sgContext.parameters.length;
  }

  this.editParamData = function(pathName, operation, paramName, paramInLocation, index){

    var param = this.sgContext.getParameter(paramName, paramInLocation);

    //debugger;
    //pms.initParameter(this.sgContext, paramName, paramInLocation);

    pms.initParameter(this.sgContext, param);

    pms.parameterToUpdate(pathName, operation, param);

  };

  /**
    * @name resetNewParamData
    * @desc a helper function to reset the data of the intputs
    * @type {Function}
   **/
  function resetNewParamData(operation){
    //debugger;
    this.newParamData[operation] = {
      name: null,
      inLocation: null,
    }
  }


}
