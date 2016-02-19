/**
 */
export default function SchemaEditorCtrl() {

    this.schema = {
        definition: this.sgSchemaObject
    };

    this.formats = ["int32", "int64", "float", "double", "string", "byte", "binary", "boolean", "date", "date-time", "password", "email", "uuid"];
    this.types = ["string", "number", "integer", "boolean", "array", "file", "object"];

    this.toggleRequired = function(propertyName, isRequired) {

        if (angular.isUndefined(isRequired)) {
            isRequired = true;
        }

        if (isRequired) {
            this.sgSchemaObject.required.push(propertyName);
        } else {
            for (var i = 0; i < this.sgSchemaObject.required.length; i++) {
                if (this.sgSchemaObject.required[i] === propertyName) {
                    this.sgSchemaObject.required.splice(i, 1);
                    return;
                }
            }
        }
    };

    this.addEnumToProperty = function addEnumToProperty(propertyName, enumItem) {
        this.sgSchemaObject.properties[propertyName].addEnum(enumItem);
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
        this.sgSchemaObject.removeProperty(propertyName);
        delete this[propertyName];
    };

}
