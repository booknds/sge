import template from "./definitionCreator.html";
import controller from "./definitionCreator.controller";

/**
 */
export default function DefinitionComponent() {
    return {
        restrict: "E",
        template,
        controller,
        controllerAs: "definitionCreation"
    };
}
