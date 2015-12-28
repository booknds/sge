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
      cs.compiled.paths = paths;
      cs.compiled.definitions = definitions;

      console.log("recompile- before clean");
      console.log(cs.compiled);

      cleanDocument(cs.compiled);

      console.log("recompile- after clean");
      console.log(cs.compiled);

      cleanDocument(cs.compiled);

      console.log("recompile- after 2nd clean");
      console.log(cs.compiled);
    }

    /**
      Remove all null values from document
    **/
    function cleanDocument(obj){

      for(var key in obj){
        console.log(key);
        if(obj[key] === null || obj[key] === ""){
          delete obj[key];
        }else{
          if(obj instanceof Object || obj instanceof Array){
            cleanDocument(obj[key]);
          }

        }
        if(obj[key] === null || obj[key] === ""){
          delete obj[key];
        }
      }

    }

    return cs;

}])
