swaggerGE.service("swaggerPathsService", ['swaggerCompiler', function(swaggerCompiler){
    "use strict";

    var self = this;

    var debug = true;

    //var paths = [];

    var paths = {};

    self.chosenParameter = {};

    /* create an object with that holds the basic info of a swagger document*/
    this.Path= function(pathName){
        return {
            currentName:  "pathName",
            newName:"",
            currentPathOperations : {
                post:false,
                get:false,
                put:false,
                delete:false
            },
            newParam: {
                post: "",
                get: "",
                put: "",
                delete: "",
            },
            //isCollapsed:false,
            pathDefinition: {
                pathName: {

                }
            }
        }
    }

    this.NewPath = function(pathName){
        paths[pathName] = new Object();
    }

    this.removePath = function(pathName){
        delete paths[pathName];
    };

    this.getPaths= function(){
        return paths;
    };

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

    this.addPath = function(pathName){
        paths[pathName] = new Object();
    };


    this.newHttpVerb= function(){
       return {
           tags: "",
           summary: "",
           description:"",
           externalDocs: {
               description: "",
               url:""
           },
           operationId:"",
           produces:"",
           consumes:"",
           parameters: {
           },
           responses: {
           },
           schemes: "",
           deprecated: false,
           security: {
           }
        }
    };
    this.newResponse= function(){
        return {
            description: "",
            schema: {},
            headers: {},

        }
    };

    /*
       used to create single header objects that will
        be used in response objects
    */
    this.newHeader= function(){
        return{
            description: "",
            type: "",
            format: "",
            items: {}
        }
    };


/************** OPERATION FUNCTIONS *******************/

    var Operation = function(){
        this.tags = null;
        this.summary = null;
        this.descripiton = null;
        this.externalDocs = new Object();
        this.operationId = null;
        this.consumes = null;
        this.produces = null;
        this.parameters = new Parameters();
        this.responses = new Object();
        this.schemes = null;
        this.deprecated = false;
        this.security = new Object();
    };

    Operation.prototype = {

        addParameter: function(paramName, paramIn){
            //if the parameter does not exist for this operation add it.
            if(!this.parameters.hasParameter){
                this.parameters.addParameter(paramName, paramIn);
            }
        },

        getJSON: function(){
            var operationJSON = {};

            for(var property in this){
                console.log(property);
                if(this[property]){
                    //if(property === "parameters");
                    operationJSON[property] = this[property];

                }
            };

            return operationJSON;

        }



    };

    this.newOperation = function(){
      return new Operation();
    }

    /* TODO make a separate Operations class */
    this.addOperation = function(path, operation){
        //console.log(paths[path]);

        console.log("PATH SERVICE: adding operation");
        console.log(path);
        console.log(paths[path]);
        console.log(operation)
        paths[path][operation] = new Operation();

        console.log(paths[path][operation]);


        //paths[path][operation] = new Operation();

        //paths[path][operation].responses = [];

    }

    /*
        Deletes an operation from a given service.
    */
    this.deleteOperation = function(path, operation){

        delete paths[path][operation];

    }

/************** PARAMETER(S) FUNCTIONS *******************/

    var Parameters = function(){
        this.parameterList = new Array();
    }

    Parameters.prototype = {
        /*
            This function add a new Parameter Object to the ParameterList
                By the Swagger definitions, "name" and "in" properties are
                required when making any parameter.
        */
        addParameter: function(paramName, paramIn){
            if(debug)
                console.log("PARAMETERS - Adding Param: " + paramName + ", " + paramIn);

            this.parameterList.push(new Parameter(paramName, paramIn));

            if(debug){
                console.log("PARAMETERS - Addws Param, paramList:  ");
                console.log(this.parameterList);
                console.log("-----------------------------------------------------")
            }
        },

        /*
            By the Swagger definition, each parameter is uniquely identified by
                The combination of the Parameter's "name" and "in" properties.
        */
        removeParameter: function(paramName, paramIn){
            if(debug)
                console.log("PARAMETER - Removing Param: " + paramName + ", " + paramIn);

            this.parameterList.forEach(function(parameter, index, paramList){
                if(parameter.name === paramName && parameter.inLocation === paramIn){
                    console.log("Removing: ");
                    console.log(paramList[index]);
                    console.log(parameter)
                    paramList.splice(index, 1);
                    return;
                }
            })

        },

        /*
            This function checks to see if the passed Parameter already Exists.
        */
        hasParameter: function(paramName, paramIn){
            if(debug)
                console.log("PARAMETER: Validating Param: " + paramName + ", " + paramIn);

            var found = 0;

            this.parameterList.forEach(function(parameter, pos, paramList){
                if(parameter.name === paramName && parameter.inLocation === paramIn){

                    found = 1;

                    return;
                }
            })

            if(found)
                return true;
            else
                return false;
        },

        /*

        */
        getParameterList: function(){
            var paramListClean = new Array();
            this.parameterList.forEach(function(parameter, index, paramList){
                console.log(parameter.getJSON());
               paramListClean.push(parameter.getJSON());
            });

            console.log(paramListClean);

            return paramListClean;
        },

        getParameter:function(name, inLoc){

            console.log("---\nGETPARAM");
            console.log(name + ", " + inLoc);
            var param;
            this.parameterList.forEach(function(parameter, index, paramList){
                console.log('-');
                console.log(parameter);
                console.log(parameter.name + ", " + name + ", " + parameter.inLocation + ", " + inLoc);
                if(parameter.name === name && parameter.inLocation === inLoc){
                    param = parameter;
                    console.log("hit!");
                }
            });

            console.log(param);
            console.log("---");
            return param;
        }
    }

    var Parameter = function(name, inLocation){
        this.name = name || "";
        this.inLocation = inLocation || "";
        this.description = null;
        this.required = (this.inLocation === "path") ? true : false;
        this.schema = new Object();
        this.type = "";
        this.format ="";
        this.allowEmptyValue = false;
        this.items= new Object();
        this.collectionFormat = "";

    }

    Parameter.prototype = {
        setName: function(newName){
            if(debug)
                console.log("Setting Param 'name': " + newName);

            this.name = newName;
        },

        getName: function(){
            return this.name;
        },

        setIn: function(newInLocation){
            if(debug)
                console.log("Setting Param 'in': " + newInLocation);

            this.inLocation = newInLocation;
        },

        getIn: function(){
            return this.inLocation;
        },

        setDescription: function(newDesc){
            if(debug)
                console.log("Setting Param 'description':" + newDesc);

            this.description = newDesc;
        },

        getDescription: function(){
            return this.description;
        },

        isRequired: function(flag){
            if(debug)
                console.log("Setting Param 'required':" + flag);

            this.required = flag;
        },

        getRequired: function(){
          return this.required;
        },

        getJSON: function(){

            var paramJSON = {};

            if(this.name){
                paramJSON.name = this.name;
            }

            if(this.inLocation){
                paramJSON.in = this.inLocation;
            }

            if(this.description){
                paramJSON.description = this.description;
            }

            paramJSON.required = this.required;

            /*return {
                name: this.name,
                in: this.inLocation,
                description: this.description,
                required: this.required
            }*/

            return paramJSON;
        }

    }

    this.newParam = function(name, id){
      return new newParameter(name, id);
    }

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
            self.chosenParameter = {
                path:pathName,
                operation:operation,
                paramName:paramName,
                inLoc:pIn
            }
        }else{
            throw "Invalid Parameter Name-in combination, must be unique."
        }
    }

    /*
        This
    */
    this.getParamList = function(pathName, operation){

        var currentPath = paths[pathName][operation];
        //console.log("LJFLAFJALKFJALF");
        //console.log(pathName);

        //console.log(currentPath);

        //console.log(currentPath.parameters);

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

    this.updateParameter = function(tempParameter){

      console.log(tempParameter);

      var originalData = tempParameter.originalValues;

      //validate new param
      //check to see if the name - inLocation pair of the parameter was changed
      if(originalData.name !== tempParameter.name || originalData.inLocation !== tempParameter.inLocation){

        console.log("name is not the same or inLocation not the same");
        console.log("\tname: " + originalData.name + ", " + tempParameter.name);
        console.log("\tinLocation: " + originalData.inLocation + ", " + tempParameter.inLocation);
        //if they have been changed check if the new combo is legitamit
        if(!validateParam(originalData.path, originalData.operation, tempParameter.name, tempParameter.inLocation)){
          throw "Invalid Parameter Name-in combination, must be unique."
        }
      }

        console.log("name and inLocation are the same");

        var originalParam = paths[originalData.path][originalData.operation].parameters.getParameter(originalData.name, originalData.inLocation);
        //var newParameter = new Parameter();

        for(var key in tempParameter){
          if(tempParameter.hasOwnProperty(key) && key !== 'originalValues' && key !== "schema"){
            originalParam[key] = tempParameter[key];
          }
          if(key === "schema"){
            if(tempParameter[key] instanceof Object)
              originalParam[key] = tempParameter[key];
            else
              originalParam[key] = JSON.parse(tempParameter[key]);
          }
        }

    }


}]);
