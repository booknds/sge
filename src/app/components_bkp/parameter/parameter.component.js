import template from "./parameter.html";
import controller from "./parameter.controller";

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
