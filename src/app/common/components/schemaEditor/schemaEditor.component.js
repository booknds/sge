import template from "./schemaEditor.html";
import controller from "./schemaEditor.controller";

/**
 */
export default function schemaEditorComponent() {
    return {
        template,
        restrict: "E",
        scope: {},
        bindToController: {
            sgSchemaObject: "=",             // passed in schema object to manipulate
            sgRestrictTypeToObject: "=?"     // used when creating a definition to restrict the type to an object
            // sgFormObject: "=",
        },
        // replace: true,
        controller,
        controllerAs: "schema",
        link: function(scope) {
            var schema = scope.schema;
            var schemaObj = scope.schema.sgSchemaObject;
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
