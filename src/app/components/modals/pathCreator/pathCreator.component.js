import template from "./pathCreator.html";
import controller from "./pathCreator.controller";

/**
 */
export default function PathCreatorComponent() {
    return {
        restrict: "E",
        template,
        controller,
        controllerAs: "pathModal"
    };
}
