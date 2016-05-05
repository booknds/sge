import template from "./response.html";
import controller from "./response.controller";

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
