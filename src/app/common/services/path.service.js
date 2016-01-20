"use strict";
import angular from 'angular';

let path = ['ObjectFactory', PathService];

export default path;

function PathService(ObjectFactory){

  var paths = {}

    this.paths = paths;

/************** PATH FUNCTIONS START *******************/
    this.setPaths= function(newPaths){
      paths = newPaths;
        console.log('updatePaths from paths service');
        console.log('\t current paths');
        console.log(paths);
        //console.log(paths);
        //var i = 0;

        //only store path definition of the path
        var defArray = {};
        for(var path in paths){
          //only update the document if the path is unique
          if(path.isUnique){
            currentPath = paths[path];

            defArray[currentPath.currentName] = currentPath.pathDefinition[currentPath.currentName];

          }
        }
        console.info(defArray);
        //swaggerCompiler.updatePaths(defArray);
        console.log('------------------------------------');
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
      if(paths.hasOwnProperty(pathName))
        return true;
      else
        return false;
    };

/************** PATH FUNCTIONS END*******************/

/************** OPERATION FUNCTIONS START *******************/

    /* make a separate Operations class */
    this.addOperation = function(pathName, operation){

        console.log("PATH SERVICE: adding operation");

        if(hasPath(pathName)){
        //  debugger;
          paths[pathName].addOperation(operation);
        }else {
          throw "Cannot add Operation, path does not exist"
        }
    }

    /*
        Deletes an operation from a given service.
    */
    this.removeOperation = function(pathName, operation){
      //reset the operation by deleteing it then adding it back as null
        // delete paths[pathName][operation];
        // paths[pathName][operation]=null;
        paths[pathName].removeOperation(operation);

    }

    // this.operationExists = function(pathName, operation){
    //   if(paths[pathName][operation]){
    //     return false;
    //   }else{
    //     return true;
    //   }
    // }

    // this.updateOperationInformation = function(pathName, operation, key, value){
    //   paths[pathName][operation][key] = value;
    // }

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

    /*
        This
    */
    // this.getParamList = function(pathName, operation){
    //
    //     var currentPath = paths[pathName][operation];
    //
    //     return currentPath.parameters;
    //
    // }

    /*

    */
    // this.getParam = function(pathName, operation, paramName, paramIn){
    //     console.log("------------------\nGETTING PARAM NAME");
    //     console.log(pathName + ", " + operation + ", " + paramName + ", " + paramIn);
    //     var parameter;// = paths[pathName][operation].parameters.getParameter(paramName, paramIn);
    //     paths[pathName][operation].parameters.forEach(function loop(element, index, array){
    //       if(element.name === paramName && element.inLocation === paramIn){
    //         parameter = element;
    //       }
    //
    //     })
    //
    //     // for(var param in paths[pathName][operation].parameters){
    //     //   if(param.name === paramName && param.inLocation === paramIn){
    //     //     parameter = param;
    //     //   }
    //     // }
    //     debugger;
    //     //console.log(paramObject);
    //     console.log("------------------");
    //     return parameter;
    // };

    /*
        Checks to see if the given param name is valid for the given path.
    */
    // function validateParam (pathName, operation, paramName, paramIn){
    //     if(debug)
    //         console.log("PATH SERVICE: Validating Param: " + paramName + ", " + paramIn + ", " + pathName + ", " + operation);
    //
    //     var path = paths[pathName][operation];
    //
    //     if(hasParameter.call(path, paramName, paramIn)){
    //         if(debug)
    //             console.log("\t Same Parameter found, returning false!");
    //
    //         return false;
    //     }else{
    //         if(debug)
    //             console.log("\t Parameter NOT found, returning true!");
    //
    //         return true;
    //     }
    // }

    // function hasParameter(name, inLoc){
    //   var found = false
    //
    //   this.parameters.forEach(function(element, index, array){
    //     if(element.name === name && element.inLocation === inLoc)
    //       found = true;
    //
    //   });
    //
    //   if(found)
    //     return true;
    //   else
    //     return false;
    // }

    /**
     *
     */
    // this.updateParameter = function(originalParameterData, newParameter){
    //   // if(debug){
    //   //   console.log("START Swagger Paths -> updating the Parameter Model");
    //   //   //console.log(originalParameterData);
    //   // }
    //
    //   var pathName = originalParameterData.pathName;
    //   var operation = originalParameterData.operation;
    //
    //   var oParamName = originalParameterData.parameter.name;
    //   var oParamIn = originalParameterData.parameter.inLocation;
    //
    //   var newParamName = newParameter.name;
    //   var newParamIn = newParameter.inLocation;
    //
    //
    //   //validate new param
    //   //check to see if the name - inLocation pair of the parameter was changed
    //   if(oParamName !== newParamName || oParamIn !== newParamIn){
    //
    //     //if they have been changed check if the new combo is unique
    //     if(!validateParam(pathName, operation, newParamName, newParamIn)){
    //       throw "Invalid Parameter Name-in combination, must be unique."
    //     }
    //   }
    //
    //     //set a reference to the actual parameter so to later manipulate
    //     var originalParam = this.getParam(pathName, operation, oParamName, oParamIn);
    //
    //     //update the original parameter with the new parameter's data
    //     for(var key in newParameter){
    //       if(newParameter.hasOwnProperty(key) && key !== "schema"){
    //         originalParam[key] = newParameter[key];
    //       }
    //       //handle schema as a special case;
    //       if(key === "schema"){
    //         //if the schema was updated, convert the JSON to an object
    //         if(newParameter[key] instanceof Object)
    //           originalParam[key] = newParameter[key];
    //         else
    //           originalParam[key] = JSON.parse(newParameter[key]);
    //       }
    //     }
    //
    //     if(debug){
    //       console.log("FINISHED Swagger Paths -> updating the Parameter Model");
    //       //console.log(originalParameterData);
    //     }
    //
    // }

/************** PARAMETERS FUNCTIONS END*******************/

/************** RESPONSE FUNCTIONS START*******************/
  // this.addResponse = function(pathName, operation, httpCode, description){
  //   if(debug){
  //     console.log("ADD RESPONSE - START");
  //   }
  //
  //   if(!description){
  //     throw "Description needs to be filled out"
  //   }
  //
  //   var path = paths[pathName][operation];
  //
  //   if(hasResponse(pathName, operation, httpCode)){
  //     throw "Http Code already exists"
  //   }else{
  //     path.responses.addResponse(httpCode, description);
  //   }
  //
  //   if(debug){
  //     console.log("ADD RESPONSE - END");
  //   }
  // }

  this.getResponse = function(pathName, operation, httpCode){
    debugger;
    console.log(pathName + ", " + operation + ", " + httpCode);
    var response = paths[pathName][operation].responses.getResponse(httpCode);
    if(response){
      return response;
    }else {
      throw "The Response Code could not be found"
    }
  }

  this.removeResponse = function (pathName, operation, httpCode){
    debugger;
    delete paths[pathName][operation].responses[httpCode];
  }

  this.updateResponse = function(originalResponseData, newResponse){

    debugger;
    console.log(originalResponseData);
    console.log(newResponse);
    var pathName = originalResponseData.pathName;
    var operation = originalResponseData.operation;

    var oHttpCode = originalResponseData.httpCode;
    var newHttpCode = newResponse.httpCode;

    if(oHttpCode !== newHttpCode){

      //if they have been changed check if the new combo is unique
      if(hasResponse(pathName, operation, newHttpCode)){
        throw "Invalid Parameter Name-in combination, must be unique."
      }else{
        this.removeResponse(pathName, operation, oHttpCode);

        this.addResponse(pathName, operation, newHttpCode, newResponse.response.description);
        var newlyAddedResponse = this.getResponse(pathName, operation, newHttpCode);

        for(var key in newlyAddedResponse){
          if(key !== 'description'){
            if(newlyAddedResponse[key] instanceof Object)
              newlyAddedResponse[key] = newResponse.response[key];
            else
              newlyAddedResponse[key] = JSON.parse(newResponse.response[key]);
          }
        }
      }

    }else{

      var originalResponse = this.getResponse(pathName, operation, oHttpCode);
      console.log("Httpcodes match");
      console.log(originalResponse);

      for(var key in originalResponse){

          if(originalResponse[key] instanceof Object || key === 'description')
            originalResponse[key] = newResponse.response[key];
          else
            originalResponse[key] = JSON.parse(newResponse.response[key]);

      }
    }
  };

  function hasResponse(pathName, operation, httpCode){
    debugger;
    var path = paths[pathName][operation];

    if(path.responses.responseExists(httpCode)){
        return true;
    }else{

        return false;
    }

  }
/************** RESPONSE FUNCTIONS END*******************/
}
