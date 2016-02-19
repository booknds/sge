import template from "./parameter.html";
import controller from "./parameter.controller";

/**
 */
export default function parameterComponent() {
    return {
        template,
        restrict: "E",
        scope: {},
        bindToController: {
            sgContext: "=",
            sgThisOperation: "@"
        },
        // replace: true,
        controller,
        controllerAs: "paramControl"
    };
}
