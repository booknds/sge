import template from "./parameterEditor.html";
import controller from "./parameterEditor.controller";

export default ParameterEditorComponent;

function ParameterEditorComponent(){
    return {
        restrict: "E",
        template,
        controller,
        controllerAs:"paramModalControl"
		// link: function(scope){

		// }
    };
}
