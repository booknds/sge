"use strict";
swaggerGE.service("swaggerPathsService", ['swaggerCompiler', function(swaggerCompiler){
    
    var self = this;
    
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
        
        paths[path][operation] = new Object();
        
        paths[path][operation].responses = [];
        
    }
    
    /*
        Deletes an operation from a given service.
    */
    this.deleteOperation = function(path, operation){

        delete paths[path][operation];
   
    }
    
/************** PARAMETER FUNCTIONS *******************/
    
    /*
        Tries to create and validate a new parameter object.
    */
    this.addNewParam = function(pathName, paramName){
        if(validateParam(pathName, paramName)){
            paths[pathName].parameters[paramName] = new Object();
        }else{
            throw "Invalid Parameter Name, must be unique."
        }
    }
    
    /*
        This 
    */
    this.getParamList = function(pathName){
        
        return paths[pathName][parameters];
        
    }
    
    /*
        Checks to see if the given param name is valid for the given path.
    */
    var validateParam = function(pathName, paramName){
        console.log("Validate Param");
        
        var path = paths[pathName];
        
        //check to see if the [parameters] object exists. If not then add the object
        if(!paths[pathName].hasOwnProperty("parameters")){
            paths[pathName].parameters = [];
        }
        
        for(var i = i)
        if(paths[pathName].parameters.hasOwnProperty(paramName)){
            return false;
        }else{
            console.log(paths[pathName][paramName]);
            return true;
        }
    }
    
    
}]);