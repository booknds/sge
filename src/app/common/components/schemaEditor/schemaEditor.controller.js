/**
 */
export default function SchemaEditorCtrl() {

    this.newProperty = {};
    this.formats = ["int32", "int64", "float", "double", "string", "byte", "binary", "boolean", "date", "date-time", "password", "email", "uuid"];
    this.types = ["string", "number", "integer", "boolean", "array", "file", "object"];

    this.toggleRequired = function(propertyName, previousState) {

        if (previousState === false || typeof previousState === "undefined") {
            this.sgSchemaObject.required.push(propertyName);
        } else {
            var propertyLocation = this.sgSchemaObject.required.indexOf(propertyName);
            this.sgSchemaObject.required.splice(propertyLocation, 1);

        }
    };

    this.addEnumToProperty = function addEnumToProperty(propertyName, enumItem) {
        this.sgSchemaObject.properties[propertyName].addEnum(enumItem);

        this[propertyName] = {};
        this[propertyName].enum = "";
    };

    this.removeEnumFromProperty = function removeEnumFromProperty(propertyName, enumItem) {
        this.sgSchemaObject.properties[propertyName].removeEnum(enumItem);
        delete this[propertyName].enum;
    };

    this.addProperty = function addProperty(propertyName) {
        this.sgSchemaObject.addProperty(propertyName);
        this.newProperty.name = "";
    };

    this.deleteProperty = function deleteProperty(propertyName) {
        this.sgSchemaObject.deleteProperty(propertyName);
        delete this[propertyName];
    };

}
