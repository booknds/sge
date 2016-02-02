import template from "./operation.html";
import controller from "./operation.controller";

export default operationComponent;

// angular 1.5 syntax for .component();
// let appComponent = {
//   template,
//   restrict: "E"
// }

function operationComponent(){
    return {
        template,
        restrict: "E",
        replace: true,
        scope:{},
        bindToController:{
            sgOperationObject: "=",
            sgOperationName: "@"
        },
        controller,
        controllerAs: "operationCtl",
        transclude:true
    };
}
