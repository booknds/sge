import template from "./main.html";
import controller from "./main.controller";

/**
 */
export default function mainComponent() {
    return {
        template,
        restrict: "E",
        // replace: true,
        controller,
        controllerAs: "compilerController"
    };
}
