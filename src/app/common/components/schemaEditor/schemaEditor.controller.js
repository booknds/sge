/**
 */
export default function SchemaEditorCtrl() {

    this.newProperty = {};
    this.formats = ["int32", "int64", "float", "double", "string", "byte", "binary", "boolean", "date", "date-time", "password", "email", "uuid"];
    this.types = ["string", "number", "integer", "boolean", "array", "file", "object"];
    this.itemTypes = [ "string", "number", "integer", "boolean"];

    this.itemsConfig = {
        types: [ "string", "number", "integer", "boolean"],
        advancedProps: ["maximum", "minimum", "exclusiveMaximum", "exclusiveMinimum", "maxLength", "minLength", "pattern", "maxItems", "minItems", "uniqueItems", "enum", "multipleOf"]
    };

    this.state = {
        advanced: {
            items: false
        },
        items: {
            advanced: false,
            advancedPropVal: null
        }
    };

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

    this.toggleAdvanced = (property) => {
        this.state.advanced[property] = !this.state.advanced[property];
    };

    this.updateItemAdvancedProp = (property, key, value) => {
        debugger;
        this.sgSchemaObject.properties.items[key] = value;
    };

    this.removeItemAdvancedProp = (key) => {
        debugger;
        delete this.sgSchemaObject.properties.items[key];
    };

}
