import template from "./operation.html";
import controller from "./operation.controller";

/**
 */
export default {
    template,
    bindings: {
        operationObj: "=",
        operationType: "@"
    },
    controller
};
