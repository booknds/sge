export default function ResponseModalService(){
    var rms = this;

    rms.currentResponse = {
      pathName:null,
      operation:null,
      httpCode:null,
      response:null,
    };

    rms.responseContext = {
      responses:null,
      httpCode:null
    }

    rms.responseToUpdate = function(httpCode, responses){
      //console.log("updaiting parameter");
      //console.log(parameter);

      // rms.currentResponse.pathName = pathName;
      // rms.currentResponse.operation = operation;
      // rms.currentResponse.httpCode = httpCode;
      // rms.currentResponse.response = angular.copy(response);
      // console.log("updated current response");
      // console.log(rms.currentResponse);
      //console.log(pms.currentParameter);
      //console.log("Done updating parameter");
      debugger;
      rms.responseContext.httpCode = httpCode;
      rms.responseContext.responses = responses;
    }

    rms.getCurrentParameter = function(){
      return rms.currentResponse;
    }

    return rms;


}
