swaggerGE.factory("ParameterModalService", [function(){

  var pms = {};


  pms.currentParameter = {
    pathName:null,
    operation:null,
    parameter:null,
  };

  pms.parameterToUpdate = function(pathName, operation, parameter){
    console.log("updaiting parameter");
    console.log(parameter);
    pms.currentParameter.parameter = angular.copy(parameter);
    pms.currentParameter.pathName = pathName;
    pms.currentParameter.operation = operation;

  }

  pms.getCurrentParameter = function(){
    return pms.currentParameter;
  }

  return pms;

}])
