swaggerGE.factory("ResponseModalService", [
  function(){
    var rms = this;

    rms.currentResponse = {
      pathName:null,
      operation:null,
      httpCode:null,
      response:null,
    };

    rms.responseToUpdate = function(pathName, operation, httpCode, response){
      //console.log("updaiting parameter");
      //console.log(parameter);

      rms.currentResponse.pathName = pathName;
      rms.currentResponse.operation = operation;
      rms.currentResponse.httpCode = httpCode;
      rms.currentResponse.response = angular.copy(response);
      console.log("updated current response");
      console.log(rms.currentResponse);
      //console.log(pms.currentParameter);
      //console.log("Done updating parameter");
    }

    rms.getCurrentParameter = function(){
      return rms.currentParameter;
    }

    return rms;


}]);
