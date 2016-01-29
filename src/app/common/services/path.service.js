"use strict";
import angular from 'angular';

let path = ['ObjectFactory', PathService];

export default path;

function PathService(ObjectFactory){

  var paths = {}

  this.paths = paths;

/************** PATH FUNCTIONS START *******************/
  this.setPaths= function(newPaths){
    debugger;
    //paths = angular.copy(newPaths);
    //this.paths = paths;
    //console.log(paths);
    for(var key in newPaths){
      paths[key] = newPaths[key];
    }
  };

  this.clearPaths = function clearPaths(){
    for(var key in paths){
      delete paths[key];
    }
  };

  this.addPath = function(pathName, operations){
    if(hasPath(pathName)){
      throw "Path name already exsists, could not add"
    }else
      paths[pathName] = ObjectFactory.newPath();
  };

  this.removePath = function(pathName){
    if(hasPath(pathName))
      delete paths[pathName];
    else
      throw "Not a valid path to delete"

  };

  this.updatePathName = function(oldPathName, newPathName){
    if(oldPathName === newPathName) return;

    if(hasPath(oldPathName)){
      paths[newPathName] = angular.copy(paths[oldPathName]);
      delete paths[oldPathName];
    }else
      throw "Original path name does not exist, could not update name"

  };

  function hasPath(pathName){
    return paths.hasOwnProperty(pathName);
  };

/************** PATH FUNCTIONS END*******************/

/************** OPERATION FUNCTIONS START *******************/

  /* make a separate Operations class */
  this.addOperation = function(pathName, operation){

      console.log("PATH SERVICE: adding operation");

      paths[pathName].addOperation(operation);

      // if(hasPath(pathName)){
      // //  debugger;
      //
      // }else {
      //   throw "Cannot add Operation, path does not exist"
      // }
  }

  /*
      Deletes an operation from a given service.
  */
  this.removeOperation = function(pathName, operation){

      paths[pathName].removeOperation(operation);

  }

/************** OPERATION FUNCTIONS END *******************/

/************** PARAMETER(S) FUNCTIONS START *******************/

  /*
      Tries to create and validate a new parameter object.
  */
  this.addNewParam = function(operation, paramName, paramIn){
    var pIn = paramIn || "query";

    if(!operation.hasParameter(paramName, pIn)){
      operation.addParameter(paramName, pIn);
    }else{
      throw "Invalid Parameter Name-in combination, must be unique."
    }
  }

/************** PARAMETERS FUNCTIONS END*******************/

/************** RESPONSE FUNCTIONS START*******************/

  this.removeResponse = function (pathName, operation, httpCode){
    debugger;
    delete paths[pathName][operation].responses[httpCode];
  }

  this.updateResponse = function(originalData, newData){

    debugger;

    if(originalData.httpCode !== newData.httpCode){
      if(originalData.responses.hasResponse(newData.httpCode))
        throw "Http Code already exists";
    }else{
      let responseList = originalData.responses
      let originalResponse = responseList.getResponse(originalData.httpCode);
      let newResponse = newData.response;

      responseList.updateResponse(originalResponse, newResponse);
    }

  };

/************** RESPONSE FUNCTIONS END*******************/
}
