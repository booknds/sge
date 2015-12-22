swaggerGE.factory("DefinitionEditorModalService", [
  function(){
    var dems = this;

    dems.currentDefinition = {
      name:null,
      value:null,
    };

    dems.definitionToUpdate = function(definitionName, definitionValue){
      //console.log("updaiting parameter");
      //console.log(parameter);

      //rms.currentResponse.pathName = pathName;
      //rms.currentResponse.operation = operation;
      //rms.currentResponse.httpCode = httpCode;
      //rms.currentResponse.response = angular.copy(response);
      dems.currentDefinition.name = definitionName;
      dems.currentDefinition.value = definitionValue;
      console.log("updated current definition");
      console.log(dems.currentDefinition);
      //console.log(pms.currentParameter);
      //console.log("Done updating parameter");
    }

    dems.getCurrentDefinition = function(){
      return dems.currentDefinition;
    }

    return dems;


}]);
