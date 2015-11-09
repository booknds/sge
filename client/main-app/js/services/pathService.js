swaggerGE.service("swaggerPathsService", ['swaggerCompiler', function(swaggerCompiler){
    "use strict";
    
    var self = this;
    
    var debug = true;
    
    //var paths = [];
    
    var paths = {};
    
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
            newParam: "",
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
    }
    
    this.getPaths= function(){
        return paths;
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
    }
    
    this.addPath = function(pathName){
        paths[pathName] = new Object();
    }
    
    
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
    }
    this.newResponse= function(){
        return {
            description: "",
            schema: {},
            headers: {},

        }
    }

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
    }
    
    
/************** OPERATION FUNCTIONS *******************/
    
    /* TODO make a separate Operations class */
    this.addOperation = function(path, operation){
        //console.log(paths[path]);
        
        console.log("PATH SERVICE: adding operation");
        console.log(path);
        console.log(paths[path]);
        console.log(paths[path][operation]);
        
        
        paths[path][operation] = new Object();
        
        paths[path][operation].responses = [];
        
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
        }
    }
    
    var Parameter = function(name, inLocation){
        this.name = name,
        this.inLocation = inLocation;
        this.description = null;
        this.required = (this.in === "path") ? true : false;
        this.schema = new Object();
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
    
    /*
        Tries to create and validate a new parameter object.
    */
    this.addNewParam = function(pathName, paramName, paramIn){
        if(debug)
            console.log("PATH SERVICE: Attempting to add a new Parameter");
        
        var pIn = paramIn || "query";
        
        if(validateParam(pathName, paramName, pIn)){
            paths[pathName].parameters.addParameter(paramName, pIn);
        }else{
            throw "Invalid Parameter Name, must be unique."
        }
    }
    
    /*
        This 
    */
    this.getParamList = function(pathName){
        
        console.log(pathName);
        
        console.log(paths[pathName].parameters.getParameterList());
        
        return paths[pathName].parameters.getParameterList();
        
    }
    
    /*
        Checks to see if the given param name is valid for the given path.
    */
    var validateParam = function(pathName, paramName, paramIn){
        if(debug)
            console.log("PATH SERVICE: Validating Param: " + paramName + ", " + paramIn);
        
        var path = paths[pathName];
        
        //check to see if the [parameters] object exists. If not then add the object
        if(!path.hasOwnProperty("parameters")){
            if(debug)
                console.log("\t adding Parameters object, returning true!");
            
            path.parameters = new Parameters();
            
            return true;
            
        }else if(path.parameters.hasParameter(paramName, paramIn)){
            if(debug)
                console.log("\t Same Parameter found, returning false!");
        
            return false;
        }else{
            if(debug)
                console.log("\t Parameter NOT found, returning true!");
            
            return true;
        }
    }
    
    
}]);