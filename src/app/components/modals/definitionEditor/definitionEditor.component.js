import template from "./definitionEditor.html";
import controller from "./definitionEditor.controller";

export default DefinitionEditorComponent;

function DefinitionEditorComponent(){
    return {
        restrict: "E",
        template,
        controller,
        controllerAs:"definitionEditor"
    };
}
