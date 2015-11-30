swaggerGE.service("swaggerCompiler", [function(){
    var self = this;
    
    var info = {};
    var paths = {};
    
    var swaggerFile=null;
    
    
    //this method to compile information is not optimized
    this.updateInfo = function(newInfo){
        info = newInfo;
        compileSwaggerData();
        console.info('COMPILER SERVICE- INFO');
        console.log(info);
        console.log(swaggerFile);
        console.log('------------------------------------');
    }
    
    this.updatePaths = function(newPaths){
        paths = newPaths;
        compileSwaggerData();
        console.info('COMPILER SERVICE- PATHS');
        console.info(newPaths);
        console.log(paths);
        console.log(swaggerFile);
        console.log('------------------------------------');
    }
    
    var compileSwaggerData = function(){
        
        swaggerFile = {};
        
         console.info('COMPILER SERVICE- COMPILING');
        
        for(item in info){
            swaggerFile[item] = info[item];
        
        }
        
        for(path in paths){
            swaggerFile.paths[path] = paths[path];
        }
        
         console.info('COMPILER SERVICE- DONE COMPILING');
        console.info(swaggerFile);
        console.log('------------------------------------');
    }
    
    this.getSwaggerFile = function(){
     return swaggerFile;   
    }
        
}]);