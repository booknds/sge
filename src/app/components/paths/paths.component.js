import template from "./paths.html";
import controller from "./paths.controller";

export default pathComponent;

// angular 1.5 syntax for .component();
// let appComponent = {
//   template,
//   restrict: "E"
// }

function pathComponent(){
    return {
        template,
        restrict: "E",
        // replace: true,
        controller,
        controllerAs: "pathCtl"
    };
}
