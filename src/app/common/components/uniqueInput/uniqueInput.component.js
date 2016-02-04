//import controller from "./uniqueInput.controller";

export default uniqueInput;

function uniqueInput(){
    return {
        restrict: "A",
        link: function(scope, element){
            // console.log("Unique controller.");
            let children = element.children();
            let newID = scope.$id;

            for (var childNode in children) {

                if (children[childNode].nodeName === "INPUT") {

                    var inputAttributes = children[childNode].attributes;

                    for (var inputIndex in inputAttributes) {
                        if (inputAttributes[inputIndex].nodeName === "id") {
                            inputAttributes[inputIndex].value = newID;
                        }
                    }

                } else if (children[childNode].nodeName === "LABEL") {

                    var labelAttributes = children[childNode].attributes;

                    for(var labelIndex in labelAttributes){
                        if(labelAttributes[labelIndex].nodeName === "for"){
                            labelAttributes[labelIndex].value = newID;
                        }
                    }

                }
            }

        }
    };
}
