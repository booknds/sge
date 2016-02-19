import template from "./operation.html";
import controller from "./operation.controller";

/**
 */
export default function operationComponent() {
    return {
        template,
        restrict: "E",
        replace: true,
        scope: {},
        bindToController: {
            sgOperationObject: "=",
            sgOperationName: "@"
        },
        controller,
        controllerAs: "operationCtl",
        transclude: true
    };
}
