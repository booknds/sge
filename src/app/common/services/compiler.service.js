"use strict";

let compiler = ["PathService", "InfoService", "DefinitionsService", CompilerService];

export default compiler;

function CompilerService(PathsService, infoService, DefinitionsService){

    var cs = this;

    //var compiled = {};

    //var info = infoService.getBaseInfo();
    var paths = PathsService.paths;
    var definitions = DefinitionsService.definitions;

    cs.compiled = {};

    cs.recompile = function(){
        cs.compiled = angular.copy(infoService.getBaseInfo());
        cs.compiled.paths = angular.copy(paths);
        cs.compiled.definitions = angular.copy(definitions);


        //remove any null or empty properties 
        cleanDocument(cs.compiled);
    };

    cs.distributeImportedDefinitionToServices = function distributeImportedDefinitionToServices(swaggerDefinition){
        //debugger;
        //reset paths by deleting old ones, set the new paths, then delete them from the new object
        PathsService.clearPaths();
        PathsService.setPaths(swaggerDefinition.paths);
        delete swaggerDefinition.paths;

        //reset definitions by deleting old ones, set the new definitions, then delete them from the new object
        DefinitionsService.clearDefinitions();
        DefinitionsService.setDefinitions(swaggerDefinition.definitions);
        delete swaggerDefinition.definitions;

        //the rest of the properties should belong to the infoService,
        infoService.setBaseInfo(swaggerDefinition);
    };

    /**
        Remove all null or empty values from swagger document
    **/
    function cleanDocument(obj){

        for (var key in obj){

            if (obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === false || obj[key] === "")) {
                delete obj[key];

            } else {

                if (obj[key] instanceof Object || obj[key] instanceof Array) {
                    cleanDocument(obj[key]);
                }

            }

            if (obj[key] === null || obj[key] === false || obj[key] === "") {
                delete obj[key];
            }

            if (obj[key] instanceof Object ) {
                if (Object.keys(obj[key]).length === 0){
                    delete obj[key];
                }
            }

            if (obj[key] instanceof Array) {
                if(obj[key].length === 0) {
                    delete obj[key];
                }
            }

            if(key === "inLocation"){
                obj.in = obj[key];
                delete obj[key];
            }

        }

    }

    return cs;

}
