export default function ParameterModalService(){

  var pms = {};

  pms.currentParameter = {
    operation:null,
    parameter:null
  };

  pms.parameterContext = {
    operation:null,
    parameter:null
  }

  pms.parameterToUpdate = function(pathName, operation, parameter){
    console.log("updaiting parameter");
    console.log(parameter);

    pms.currentParameter.pathName = pathName;
    pms.currentParameter.operation = operation;
    pms.currentParameter.parameter = angular.copy(parameter);

  };

  pms.initParameter = function(operation, parameter){
    // debugger;
    //console.log(operation);
    ///console.log(parameterName);
    //console.log(inLocation);

    pms.parameterContext.operation = operation;
    pms.parameterContext.parameter = parameter;
  };

  pms.getCurrentParameter = function(){
    return pms.currentParameter;
  };

  return pms;

}
