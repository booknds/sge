let ParameterController = ['$scope', 'PathService', "ParameterModalService", ParameterCtrl];

export default ParameterController;

function ParameterCtrl($scope, PathService, pms){

  this.path = {
    name: null,
    operation: null,
  };

  this.newParamData = {
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
  };

  this.inLocationList = ["path", "query", "header", "body", "formData"];

  this.pLength = null;

  //Param methods
  this.addParam = function(paramName, paramInLocation){

      try{
          PathService.addNewParam(this.sgContext, paramName, paramInLocation)
      }catch(e){
          console.log(e);
          Materialize.toast("Parameter name/query combo' already exists", 3000);
      }

      this.newParamData[operation].name = "";

      this.pLength = this.sgContext.parameters.length;

  }

  this.editParamData = function(pathName, operation, paramName, paramInLocation, index){

    var param = this.sgContext.getParameter(paramName, paramInLocation);

    debugger;
    //pms.initParameter(this.sgContext, paramName, paramInLocation);

    pms.initParameter(this.sgContext, param);

    pms.parameterToUpdate(pathName, operation, param);

  };


}
