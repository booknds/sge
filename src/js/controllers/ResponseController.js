swaggerGE.controller("responseController",["$scope", "PathService", "ResponseService",
 function($scope, swaggerPaths, responseService){
  "use strict";

  var responseControl = this;

  responseControl.prevent = {
    responseUpdate: false
  }

  responseControl.tempResponse = null;
  responseControl.currentResponse = null;

  responseControl.responseList = {
    post:new Array(),
    get:new Array(),
    put:new Array(),
    delete:new Array(),
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
  }

  responseControl.addResponse = function(path, operation, httpCode, description){
    console.log("addResponse");
    console.log(httpCode);
    console.log(description);
    console.log(responseControl.newResponseData);
    //if(hasResponse(path, operation, httpCode))
    if(hasResponse(operation, httpCode))
      throw "This reposne code already exists"
    else
      responseControl.responseList[operation].push(responseService.newResponse(httpCode, description));

    console.log(responseControl.responseList[operation]);

  }

  function hasResponse(operation, httpCode){
    console.log("Checking response list")
    var exists = false;
    responseControl.responseList[operation].forEach(function(response, index, responseList){
      console.log(response);
      console.log(httpCode);
      console.log("---");
      if(response.code === httpCode){
        console.log("hit");
        exists = true;
        //return;
      }
    });

    return exists;
  }


}]);
