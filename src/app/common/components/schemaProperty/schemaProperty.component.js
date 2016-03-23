import template from "./schemaProperty.html";
import controller from "./schemaProperty.controller";

/**
 */
export default function SchemaPropertyComponent() {
    return {
        template,
        restrict: "E",
        scope: {},
        bindToController: {
            // sgSchemaObject: "=",             // passed in schema object to manipulate
            sgProperty: "=",
            sgPropertyHelpers: "="
        },
        // replace: true,
        controller,
        controllerAs: "$ctrl",
        link: function(scope) {
            var schema = scope.$ctrl;
            var schemaObj = scope.$ctrl.sgSchemaObject;
            var properties = schemaObj.properties;

            schema.required = {};

            for (var property in properties) {
                if (properties.hasOwnProperty(property)) {
                    schema.required[property] = (schemaObj.required.indexOf(property) >= 0);
                }
            }
        }
    };
}
