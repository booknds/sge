swaggerGE.service("swaggerPathsService", ['swaggerCompiler', function(swaggerCompiler){
    
    var self = this;
    
    var paths = [];
    
    var pathsObj = {};
    
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
            isCollapsed:false,
            pathDefinition: {
                pathName: {

                }
            }
        }
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
    
    /*
        Tries to create and validate a new parameter object.
    */
    this.addNewParam = function(pathName, paramName){
        if(validateParam()){
            pathObj[pathName][paramName] = new Object();
        }else{
            throw "Invalid Parameter Name, must be unique."
        }
    }
    
    /*
        Checks to see if the given param name is valid for the given path.
    */
    var validateParam = function(pathName, paramName){
        console.log("Validate Param");
        
        if(pathsObj[pathName][paramName]){
            return false;
        }else{
            console.log(pathsObj[pathName][paramName]);
            return true;
        }
    }
    
    
    
    
    
    
    
    
}]);