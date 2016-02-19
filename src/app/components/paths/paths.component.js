import template from "./paths.html";
import controller from "./paths.controller";

/**
 */
export default function pathComponent() {
    return {
        template,
        restrict: "E",
        // replace: true,
        controller,
        controllerAs: "pathCtl"
    };
}
