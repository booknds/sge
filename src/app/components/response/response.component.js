import template from "./response.html";
import controller from "./response.controller";

/**
 */
export default function responseComponent() {
    return {
        template,
        scope: {},
        bindToController: {
            sgContext: "=",
            sgThisOperation: "@"
        },
        restrict: "E",
        // replace: true,
        controller,
        controllerAs: "responseControl"
    };
}
