"use strict";

let DefEditModalService = ["$log", DefinitionEditorModalService]; 

export default DefEditModalService;

function DefinitionEditorModalService($log){

    this.currentDefinition = {
        name:null,
        value:null
    };

    this.definitionToUpdate = function(definitionName, definitionValue){

        this.currentDefinition.name = definitionName;
        this.currentDefinition.value = definitionValue;
        $log.log("updated current definition");
        $log.log(this.currentDefinition);
    };

    this.getCurrentDefinition = function(){
        return this.currentDefinition;
    };

    return this;

}
