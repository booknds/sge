import template from "./main.html";
import controller from "./main.controller";

// angular 1.5 syntax for .component();
// let appComponent = {
//   template,
//   restrict: "E"
// }

function mainComponent(){
    return {
        template,
        restrict: "E",
        // replace: true,
        controller,
        controllerAs: "compilerController"
    };
}

export default mainComponent;
