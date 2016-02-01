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
            sgOperationColorer: "@"
        },
        link: function(scope, element){
            //debugger;

            switch(scope.sgOperationColorer){
            case "get":
                element.addClass("blue");
                break;
            case "post":
                element.addClass("green");
                break;
            case "put":
                element.addClass("orange");
                break;
            case "delete":
                element.addClass("red");
                break;
            }

        }
    };
}
