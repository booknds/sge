import template from "./responseEditor.html";
import controller from "./responseEditor.controller";

/**
 */
export default function ResponseEditorComponent() {
    return {
        restrict: "E",
        template,
        controller,
        controllerAs: "rmControl"
    };
}
