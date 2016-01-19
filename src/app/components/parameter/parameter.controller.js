let ParameterController = ['$scope', 'PathService', "ParameterModalService", ParameterCtrl];

export default ParameterController;

function ParameterCtrl($scope, swaggerPaths, pms){

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
  };

  this.pLength = null;

  //Param methods
  this.addParam = function(paramName, paramInLocation){

      try{
          swaggerPaths.addNewParam(this.sgContext, paramName, paramInLocation)
      }catch(e){
          console.log(e);
          Materialize.toast("Parameter name/query combo' already exists", 3000);
      }

      paramControl.newParamData[operation].name = "";

      this.pLength = this.sgContext.parameters.length;

  }

  paramControl.editParamData = function(pathName, operation, paramName, paramInLocation, index){

    var param = this.sgContext.getParameter(paramName, paramInLocation);

    debugger;
    //pms.initParameter(this.sgContext, paramName, paramInLocation);

    pms.initParameter(this.sgContext, param);

    pms.parameterToUpdate(pathName, operation, param);

  };


}
