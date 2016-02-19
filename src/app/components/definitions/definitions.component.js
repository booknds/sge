import template from "./definitions.html";
import controller from "./definitions.controller";

/**
 */
export default function DefinitionsComponent() {
    return {
        restrict: "E",
        template,
        controller,
        controllerAs: "defControl"
    };
}
