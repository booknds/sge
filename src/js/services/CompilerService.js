swaggerGE.factory('CompilerService',["swaggerBaseService", "PathService", "DefinitionsService",
  function(infoService, PathsService, DefinitionsService){

    var cs = this;

    //var compiled = {};

    var info = infoService.getSwaggerInfo();
    var paths = PathsService.paths;
    var definitions = DefinitionsService.definitions;

    cs.compiled = {};

    cs.recompile = function(){
      cs.compiled = angular.copy(infoService.getSwaggerInfo());
      cs.compiled.paths = angular.copy(paths);
      cs.compiled.definitions = angular.copy(definitions);

      console.log("recompile- before clean");
      console.log(cs.compiled);

      cleanDocument(cs.compiled);

      console.log("recompile- after clean");
      console.log(cs.compiled);

      //cleanDocument(cs.compiled);

      //console.log("recompile- after 2nd clean");
      //console.log(cs.compiled);
    }

    /**
      Remove all null or empty values from swagger document
    **/
    function cleanDocument(obj){

      for(var key in obj){
        
        if(obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === "")){

          delete obj[key];

        }else{

          if(obj[key] instanceof Object || obj[key] instanceof Array){
              cleanDocument(obj[key]);
          }

        }

        if(obj[key] === null || obj[key] === ""){
          delete obj[key];
        }

        if(obj[key] instanceof Object ){
            if(Object.keys(obj[key]).length === 0)
              delete obj[key];
          }

        if(obj[key] instanceof Array){
          if(obj[key].length === 0)
            delete obj[key];
        }
      
      }

    }

    return cs;

}])
