swaggerGE.service("PathService", ['swaggerCompiler', 'OperationService',
function(swaggerCompiler, OperationService){
    "use strict";

    var self = this;

    var debug = true;

    //var paths = [];

    var paths = {};

/************** PATH FUNCTIONS START *******************/
    var Path = function(){
      this.get = null;
      this.post = null;
      this.put = null;
      this.delete = null;
      /** TODO future attributes
      this.options
      this.head
      this.patch
      this.parameters
      */
    }

    Path.prototype = {
      addOperation: function(operation){
        this[operation] = OperationService.newOperation();
      },

      removeOperation: function(operation){
        delete this[operation];
        this[operation] = null;
      }
    }

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
      if(pathExists(pathName)){
        throw "Path name already exsists, could not add"
      }else
        paths[pathName] = new Path();
    };

    this.removePath = function(pathName){
      if(pathExists(pathName))
        delete paths[pathName];
      else
        throw "Not a valid path to delete"

    };

    this.updatePathName = function(oldPathName, newPathName){
      if(oldPathName === newPathName) return;

      if(pathExists(oldPathName)){
        paths[newPathName] = angular.copy(paths[oldPathName]);
        delete paths[oldPathName];
      }else
        throw "Original path name does not exist, could not update name"

    };

    function pathExists(pathName){
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

        if(pathExists(pathName)){
          paths[pathName][operation] = OperationService.newOperation();
        }else {
          throw "Cannot add Operation, path does not exist"
        }


    }

    /*
        Deletes an operation from a given service.
    */
    this.removeOperation = function(pathName, operation){
      //reset the operation by deleteing it then adding it back as null
        delete paths[pathName][operation];
        paths[pathName][operation]=null;

    }

    this.operationExists = function(pathName, operation){
      if(paths[pathName][operation]){
        return false;
      }else{
        return true;
      }
    }

/************** OPERATION FUNCTIONS END *******************/

/************** PARAMETER(S) FUNCTIONS START *******************/


    /*this.newParam = function(name, id){
      return new newParameter(name, id);
    }*/

    /*
        Tries to create and validate a new parameter object.
    */
    this.addNewParam = function(pathName, operation, paramName, paramIn){
        if(debug){
            console.log("PATH SERVICE: Attempting to add a new Parameter");
            console.log(pathName);
            console.log(operation);
            console.log(paramName);
        }

        var pIn = paramIn || "query";

        var path = paths[pathName][operation];

        if(validateParam(pathName, operation, paramName, pIn)){
            path.parameters.addParameter(paramName, pIn);

        }else{
            throw "Invalid Parameter Name-in combination, must be unique."
        }
    }

    /*
        This
    */
    this.getParamList = function(pathName, operation){

        var currentPath = paths[pathName][operation];

        return currentPath.parameters.getParameterList();

    }

    this.getParam = function(pathName, operation, paramName, paramIn){
        console.log("------------------\nGETTING PARAM NAME");
        console.log(pathName + ", " + operation + ", " + paramName + ", " + paramIn);
        var paramObject = paths[pathName][operation].parameters.getParameter(paramName, paramIn);
        console.log(paramObject);
        console.log("------------------");
        return paramObject
    };

    /*
        Checks to see if the given param name is valid for the given path.
    */
    var validateParam = function(pathName, operation, paramName, paramIn){
        if(debug)
            console.log("PATH SERVICE: Validating Param: " + paramName + ", " + paramIn + ", " + pathName + ", " + operation);

        var path = paths[pathName][operation];

        if(path.parameters.hasParameter(paramName, paramIn)){
            if(debug)
                console.log("\t Same Parameter found, returning false!");

            return false;
        }else{
            if(debug)
                console.log("\t Parameter NOT found, returning true!");

            return true;
        }
    }

    this.updateParameter = function(originalParameterData, newParameter){

      console.log(originalParameterData);



      //var originalData = tempParameter.originalValues;

      //validate new param
      //check to see if the name - inLocation pair of the parameter was changed
      if(originalParameterData.parameter.name !== newParameter.name || originalParameterData.parameter.inLocation !== newParameter.inLocation){

        console.log("name is not the same or inLocation not the same");
        console.log("\tname: " + originalParameterData.parameter.name + ", " + newParameter.name);
        console.log("\tinLocation: " + originalParameterData.parameter.inLocation + ", " + newParameter.inLocation);
        //if they have been changed check if the new combo is legitamit
        if(!validateParam(originalParameterData.pathName, originalParameterData.operation, newParameter.name, newParameter.inLocation)){
          throw "Invalid Parameter Name-in combination, must be unique."
        }
      }

        console.log("name and inLocation are the same");

        var originalParam = paths[originalParameterData.pathName][originalParameterData.operation].parameters.getParameter(originalData.name, originalData.inLocation);
        //var newParameter = new Parameter();

        for(var key in newParameter){
          if(newParameter.hasOwnProperty(key) && key !== 'originalValues' && key !== "schema"){
            originalParam[key] = newParameter[key];
          }
          if(key === "schema"){
            if(newParameter[key] instanceof Object)
              originalParam[key] = newParameter[key];
            else
              originalParam[key] = JSON.parse(newParameter[key]);
          }
        }

    }

    this.paths = paths;

    this.chosenParameter= null;

    this.updateChosenParameter = function(newChosen){
      chosenParameter = newChosen;
    };

/************** PARAMETERS FUNCTIONS END*******************/

}]);
