import template from "./dropdown.html";
import controller from "./dropdown.controller";

/**
 */
export default function DropdownComponent() {
    return {
        restrict: "E",
        replace: true,
        template,
        scope: {},
        bindToController: {
            ngModel: "=",
            sgChoices: "=",
            sgDefaultOption: "@",
            sgLabel: "@"
        },
        controller,
        controllerAs: "dropdown"
    };
}
