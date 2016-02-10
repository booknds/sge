// import template from "./operation.html";
// import controller from "./operation.controller";

export default colorerComponent;

// angular 1.5 syntax for .component();
// let appComponent = {
//   template,
//   restrict: "E"
// }

function colorerComponent(){
    return {
        restrict: "A",
        scope:{
            sgOperationColorer: "@",
            sgSelector: "@"
        },
        link: function(scope, element){
            

            switch (scope.sgOperationColorer) {
            case "get":
                //element.addClass("blue");
                element.css(scope.sgSelector, "#2196F3");
                break;
            case "post":
                // element.addClass("green");
                element.css(scope.sgSelector, "#4CAF50");
                break;
            case "put":
                // element.addClass("orange");
                element.css(scope.sgSelector, "#ff9800");
                break;
            case "delete":
                // element.addClass("red");
                element.css(scope.sgSelector, "#F44336");
                break;
            }

        }
    };
}
