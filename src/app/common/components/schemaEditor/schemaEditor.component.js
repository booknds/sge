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
        controllerAs: "schema"
    };
}
