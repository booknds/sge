import template from "./definitions.html";
import controller from "./definitions.controller";

export default DefinitionsComponent;

function DefinitionsComponent() {
    return {
        restrict: "E",
        template,
        controller,
        controllerAs: "defControl"
    };
}
