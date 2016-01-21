"use strict";

export default DefinitionEditorModalService;

function DefinitionEditorModalService(){

  this.currentDefinition = {
    name:null,
    value:null,
  };

  this.definitionToUpdate = function(definitionName, definitionValue){
    //console.log("updaiting parameter");
    //console.log(parameter);

    //rms.currentResponse.pathName = pathName;
    //rms.currentResponse.operation = operation;
    //rms.currentResponse.httpCode = httpCode;
    //rms.currentResponse.response = angular.copy(response);
    this.currentDefinition.name = definitionName;
    this.currentDefinition.value = definitionValue;
    console.log("updated current definition");
    console.log(this.currentDefinition);
    //console.log(pms.currentParameter);
    //console.log("Done updating parameter");
  }

  this.getCurrentDefinition = function(){
    return this.currentDefinition;
  }

  return this;


}
