swaggerGE.service("PathService", ['swaggerCompiler', 'OperationService',
function(swaggerCompiler, OperationService){
    "use strict";

    var self = this;

    var debug = true;

    //var paths = [];

    var paths = {};

    self.paths = paths;

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

    self.setPaths= function(newPaths){
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

    self.addPath = function(pathName, operations){
      if(pathExists(pathName)){
        throw "Path name already exsists, could not add"
      }else
        paths[pathName] = new Path();
    };

    self.removePath = function(pathName){
      if(pathExists(pathName))
        delete paths[pathName];
      else
        throw "Not a valid path to delete"

    };

    self.updatePathName = function(oldPathName, newPathName){
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
    self.addOperation = function(pathName, operation){

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
    self.removeOperation = function(pathName, operation){
      //reset the operation by deleteing it then adding it back as null
        delete paths[pathName][operation];
        paths[pathName][operation]=null;

    }

    self.operationExists = function(pathName, operation){
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
    self.addNewParam = function(pathName, operation, paramName, paramIn){
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
    self.getParamList = function(pathName, operation){

        var currentPath = paths[pathName][operation];

        return currentPath.parameters.getParameterList();

    }

    self.getParam = function(pathName, operation, paramName, paramIn){
        console.log("------------------\nGETTING PARAM NAME");
        console.log(pathName + ", " + operation + ", " + paramName + ", " + paramIn);
        var paramObject = paths[pathName][operation].parameters.getParameter(paramName, paramIn);
        console.log(paramObject);
        console.log("------------------");
        return paramObject;
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

    /**
     *
     */
    self.updateParameter = function(originalParameterData, newParameter){
      if(debug){
        console.log("START Swagger Paths -> updating the Parameter Model");
        //console.log(originalParameterData);
      }

      var pathName = originalParameterData.pathName;
      var operation = originalParameterData.operation;

      var oParamName = originalParameterData.parameter.name;
      var oParamIn = originalParameterData.parameter.inLocation;

      var newParamName = newParameter.name;
      var newParamIn = newParameter.inLocation;


      //validate new param
      //check to see if the name - inLocation pair of the parameter was changed
      if(oParamName !== newParamName || oParamIn !== newParamIn){

        //if they have been changed check if the new combo is unique
        if(!validateParam(pathName, operation, newParamName, newParamIn)){
          throw "Invalid Parameter Name-in combination, must be unique."
        }
      }

        //set a reference to the actual parameter so to later manipulate
        var originalParam = self.getParam(pathName, operation, oParamName, oParamIn);

        //update the original parameter with the new parameter's data
        for(var key in newParameter){
          if(newParameter.hasOwnProperty(key) && key !== "schema"){
            originalParam[key] = newParameter[key];
          }
          //handle schema as a special case;
          if(key === "schema"){
            //if the schema was updated, convert the JSON to an object
            if(newParameter[key] instanceof Object)
              originalParam[key] = newParameter[key];
            else
              originalParam[key] = JSON.parse(newParameter[key]);
          }
        }

        if(debug){
          console.log("FINISHED Swagger Paths -> updating the Parameter Model");
          //console.log(originalParameterData);
        }

    }




/************** PARAMETERS FUNCTIONS END*******************/

}]);
