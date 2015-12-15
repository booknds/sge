swaggerGE.controller("responseController",["$scope", "PathService", "ResponseModalService",
 function($scope, PathService, rms){
  "use strict";

  var responseControl = this;

  responseControl.prevent = {
    responseUpdate: false
  }

  responseControl.newResponseData = {
    post:{
      httpCode:null,
      description:null,
    },
    get:{
      httpCode:null,
      description:null,
    },
    put:{
      httpCode:null,
      description:null,
    },
    delete:{
      httpCode:null,
      description:null,
    },
  }

  responseControl.initResponseData = function(pathName, operation, httpCode){
    console.log("initResponseData");
    try{
      var currentResponse = PathService.getResponse(pathName, operation, httpCode);
      console.log(currentResponse);
      console.log(httpCode);
      rms.responseToUpdate(pathName, operation, httpCode, currentResponse);
    }catch(e){
      console.log(e);
      Materialize.toast(e, 3000);
      return;
    }



  }

  responseControl.addResponse = function(pathName, operation, httpCode, description){
    console.log("RESPONSE CONTROLLER - ADD RESPONSE");

    try{
      PathService.addResponse(pathName, operation, httpCode, description);
    }catch(e){
      console.log(e);
      Materialize.toast(e, 3000);
    }

    responseControl.newResponseData[operation]= {
      httpCode:null,
      description:null,
    }

  }


}]);
