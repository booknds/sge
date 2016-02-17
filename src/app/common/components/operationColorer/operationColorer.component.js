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
            sgSelector: "@",
            sgRandomize: "="
        },
        link: function(scope, element){
            

            // switch (scope.sgOperationColorer) {
            // case "get":
            //     //element.addClass("blue");
            //     element.css(scope.sgSelector, "#2196F3");
            //     break;
            // case "post":
            //     // element.addClass("green");
            //     element.css(scope.sgSelector, "#4CAF50");
            //     break;
            // case "put":
            //     // element.addClass("orange");
            //     element.css(scope.sgSelector, "#ff9800");
            //     break;
            // case "delete":
            //     // element.addClass("red");
            //     element.css(scope.sgSelector, "#F44336");
            //     break;
            // }

            // debugger;

            if (scope.sgRandomize) {
                var colorChoice = Math.floor(Math.random() * 4) + 1;
                switch (colorChoice) {
                case 1:
                    //element.addClass("blue");
                    element.css(scope.sgSelector, "#378B80");
                    break;
                case 2:
                    // element.addClass("green");
                    element.css(scope.sgSelector, "#277268");
                    break;
                case 3:
                    // element.addClass("orange");
                    element.css(scope.sgSelector, "#C4B26B");
                    break;
                case 4:
                    // element.addClass("red");
                    element.css(scope.sgSelector, "#8B3089");
                    break;
                }
            } else { 

                // switch (scope.sgOperationColorer) {
                // case "get":
                //     //element.addClass("blue");
                //     element.css(scope.sgSelector, "#378B80");
                //     break;
                // case "post":
                //     // element.addClass("green");
                //     element.css(scope.sgSelector, "#277268");
                //     break;
                // case "put":
                //     // element.addClass("orange");
                //     element.css(scope.sgSelector, "#C4B26B");
                //     break;
                // case "delete":
                //     // element.addClass("red");
                //     element.css(scope.sgSelector, "#8B3089");
                //     break;
                // }
                switch (scope.sgOperationColorer) {
                case "get":
                    //element.addClass("blue");
                    element.css(scope.sgSelector, "#69812f");
                    break;
                case "post":
                    // element.addClass("green");
                    element.css(scope.sgSelector, "#444C35");
                    break;
                case "put":
                    // element.addClass("orange");
                    element.css(scope.sgSelector, "#A58C8B");
                    break;
                case "delete":
                    // element.addClass("red");
                    element.css(scope.sgSelector, "#722827");
                    break;
                }
            }

            


        }
    };
}
