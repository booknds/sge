/**
 *
 */
function Schema(name = null) {
    this._name = name;
    this.dataState = new Map();
    this.appState = new Map();
    this.linkedState = new WeakMap();
    this.linkedState.set(this.dataState, this.appState);

    this._allowedProperties = ["title", "description", "$ref", "type", "required", "default", "format", "maximum", "minimum", "exclusiveMaximum", "exclusiveMinimum", "maxLength", "minLength", "pattern", "maxItems", "minItems", "uniqueItems", "enum", "multipleOf", "items", "allOf", "properties", "additionalProperties"];

    const initialProperties = ["description", "$ref", "required"];

    initialProperties.forEach((prop) => {
        this.dataState.set(prop, "");
    });

}

// Schema.prototype.getName = function getName() {
//     return this._name;
// };

Schema.prototype.updateProperty = function updateProperty(prop, value) {
    if (this._allowedProperties.indexOf(property) > -1) {
        return;
    }

    this.dataState.set(prop, value);
};

Schema.prototype.removeProperty = function removeProperty(property) {
    this.dataState.delete(property);
};

// Schema.prototype.createProperty = function createProperty(property, value = null) {
//     if (this._allowedProperties.indexOf(property) > -1) {
//         return;
//     }

//     this.dataState.set(property, value);
// };

module.exports = Schema;
