import template from "./info.html";
import controller from "./info.controller";

// angular 1.5 syntax for .component();
// let appComponent = {
//   template,
//   restrict: "E"
// }

/**
 */
export default function infoComponent() {
    return {
        template,
        restrict: "E",
        // replace: true,
        controller,
        controllerAs: "basicInfo"
    };
}
