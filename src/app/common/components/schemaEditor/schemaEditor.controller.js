// const ObjectFactory = require("../../services/objectFactory.service.js")();

/**
 */
export default function SchemaEditorCtrl(ObjectFactory) {

    this.newProperty = {};
    this.formats = ["int32", "int64", "float", "double", "string", "byte", "binary", "boolean", "date", "date-time", "password", "email", "uuid"];
    this.types = ["string", "number", "integer", "boolean", "array", "file", "object"];
    this.itemTypes = [ "string", "number", "integer", "boolean"];

    this.itemsConfig = {
        types: [ "string", "number", "integer", "boolean"],
        advancedProps: ["format", "maximum", "minimum", "exclusiveMaximum", "exclusiveMinimum", "maxLength", "minLength", "pattern", "maxItems", "minItems", "uniqueItems", "enum", "multipleOf"]
    };

    this.definitionConfig = {
        advancedProp: ["allOf"]
    };

    this.state = {
        show: {
            advanced: false
        },
        advancedProps: {
            allOf: false
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
        initState.call(this, propertyName);
    };

    this.deleteProperty = function deleteProperty(propertyName) {
        this.sgSchemaObject.deleteProperty(propertyName);
        delete this[propertyName];
    };

    this.toggleAdvancedOptions = () => {
        this.state.show.advanced = !this.state.show.advanced;
    };

    this.addAllOf = () => {
        this.sgSchemaObject.allOf.push(ObjectFactory.newSchema());
    };

    this.toggleAdvanced = (property, option) => {
        this.state[property].show.advanced[option] = !this.state[property].show.advanced[option];
    };

    this.updateItemAdvancedProp = (property, key, value) => {
        property.items[key] = value;
    };

    this.removeItemAdvancedProp = (property, key) => {
        delete property.items[key];
    };

    this.updateProperty = (property, key, value) => {
        if (key === "enum" ) {
            property.enum = [];
            value.split(",").forEach((item) => {
                property.enum.push(item);
            });
        } else {
            property[key] = value;
        }
    };
    this.removeAdvancedProp = (property, key) => {
        delete property[key];
    };

    /**
     *
     */
    function initState(propertyName) {
        this.state[propertyName] = {
            show: {
                advanced: {
                    items: false,
                    property: false
                }
            },
            items: {
                advancedProp: null,
                advancedPropVal: null,
                advancedPropOptions: ["format", "maximum", "minimum", "exclusiveMaximum", "exclusiveMinimum", "maxLength", "minLength", "pattern", "maxItems", "minItems", "uniqueItems", "enum", "multipleOf"]
            },
            additionalProps: {
                advancedProp: null,
                advancedPropVal: null,
                advancedPropOptions: ["format", "maximum", "minimum", "exclusiveMaximum", "exclusiveMinimum", "maxLength", "minLength", "pattern", "maxItems", "minItems", "uniqueItems", "enum", "multipleOf"]
            }
        };
    }

}
