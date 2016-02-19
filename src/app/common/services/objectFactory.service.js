/**
 */
export default function ObjectFactory($log, $window, UtilitiesService) {

    let Path = {
        init: function() {
        // this.get = null;
        // this.post = null;
        // this.put = null;
        // this.delete = null;
        /** TODO future attributes
        this.options
        this.head
        this.patch
        this.parameters
        */
        },
        addOperation: function(operation) {
            this[operation] = newOperation();
        },

        removeOperation: function(operation) {
            delete this[operation];
            // this[operation] = null;
        },

        setPath: function setPath(path) {
            debugger;
            for (var key in path) {
                if (path.hasOwnProperty(key)) {
                    this[key] = newOperation();
                    this[key].setOperation(path[key]);
                }
            }
        }
    };

    let Definitions = {

        addDefinition: function(definitionName, description, type) {
            let temp = Object.create(Schema);
            temp.init(definitionName, description, type);
            this[definitionName] = temp;
        },

        hasDefinition: function(definitionName) {
            // if (this.hasOwnProperty(definitionName)){
            //     return true;
            // } else {
            //     return false;
            // }
            return this.hasOwnProperty(definitionName);
        },

        clearDefinitions: function() {
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    delete this[key];
                }
            }
        },

        setDefinitions: function(definitions) {
            for (var definition in definitions) {
                if (definitions.hasOwnProperty(definition)) {
                    this[definition] = Object.create(Schema);
                    this[definition].init(definition);
                    this[definition].setSchema(definitions[definition]);
                }
            }
        },

        getDefinition: function(definitionName) {
            return this[definitionName];
        }
    };

    let Operation = {
        init: function() {
            this.tags = null;
            this.summary = null;
            this.description = null;
            this.externalDocs = {};
            this.operationId = null;
            this.consumes = [];
            this.produces = [];
            this.parameters = [];
            this.responses = newResponses();
            this.schemes = [];
            this.deprecated = false;
            this.security = {};
        },

        addParameter: function(paramName, paramIn) {
            this.parameters.push(newParameter(paramName, paramIn));
        },

        setOperation: function setOperation(operation) {
            for (var key in operation) {
                if (this.hasOwnProperty(key) && operation.hasOwnProperty(key)) {

                    if (key === "responses") {
                        this[key] = newResponses();
                        this[key].setResponses(operation[key]);

                    } else if (key === "parameters") {
                        var i = 0,
                            max = operation[key].length;

                        // go through each parameter create a new one and copy the passed parameter to the newly created one
                        for (i; i < max; i += 1) {
                            this[key].push(newParameter());
                            this[key][i].setParameter(operation[key][i]);
                        }
                        // this[key].push(newParameter()); //addParameter();

                    } else {
                        this[key] = operation[key];
                    }
                }
            }
        },

        getParameter: function(name, inLoc) {
            var parameter = null;
            this.parameters.forEach(function(element) {
                // console.log(element);
                if (element.name === name && element.inLocation === inLoc) {
                    parameter = element;
                    return;
                }
            });

            return parameter;
        },

        removeParameter: function(name, inLoc) {

            this.parameters.forEach(function(parameter, index) {
                if (parameter.name === name && parameter.inLocation === inLoc) {
                    this.parameters.splice(index, 1);
                    return;
                }
            }.bind(this));
        },

        hasParameter: function(name, inLoc) {
            let found = false;

            this.parameters.forEach(function(element) {
                if (element.name === name && element.inLocation === inLoc) {
                    found = true;
                }
            });

            // if (found) {
            //     return true;
            // } else {
            //     return false;
            // }
            return found;

        },

        updateParameter: function(oldParam, newParam) {

            let original = this.getParameter(oldParam.name, oldParam.inLocation);

            for (let key in newParam) {
                if (newParam.hasOwnProperty(key)) {
                    original[key] = newParam[key];
                }
            }

        },

        addType: function addType(listType, type) {
            // check if list exists
            if (listType !== "consumes" && listType !== "produces" && listType !== "schemes") {
                $log.warn("List does not exist");
                UtilitiesService.toast("List does not exist", 3000);

            }

            // check if type exists
            if (type) {
                // check if type is already in the list
                if (this[listType].indexOf(type) === -1) {
                    this[listType].push(type);

                } else {
                    $log.warn("Type already exists in this list");
                    UtilitiesService.toast("Type already exists in this list", 3000);
                }

            } else {
                $log.warn("Type not chosen!");
                UtilitiesService.toast("Type not chosen!", 3000);

            }
        },

        removeType: function removeType(listType, type) {
            // check if list exists
            if (listType !== "consumes" && listType !== "produces" && listType !== "schemes") {
                $log.warn("List does not exist");
                UtilitiesService.toast("List does not exist", 3000);
            }

            let index = this[listType].indexOf(type);

            if (index >= 0) {
                this[listType].splice(index, 1);

            } else {
                $log.warn("Type already deleted");
                UtilitiesService.toast("Type already deleted", 3000);
            }
        },

        getJSON: function() {
            var operationJSON = {};

            for (var property in this) {
                // console.log(property);
                if (this[property] && this.hasOwnProperty(property)) {
                    // if(property === "parameters");
                    operationJSON[property] = this[property];
                }
            }

            return operationJSON;

        }

    };

    let Parameter = {
        init: function(name, inLocation) {
            this.name = name || "";
            this.inLocation = inLocation || "query";
            this.description = null;
            this.required = (this.inLocation === "path") ? true : false;
            this.schema = newSchema();
            this.type = "";
            this.format = "";
            this.allowEmptyValue = false;
            this.items = {};
            this.collectionFormat = "";
        },

        setParameter: function setParameter(newParam) {
            for (var key in newParam) {
                if (this.hasOwnProperty(key) && newParam.hasOwnProperty(key)) {
                    if (key === "schema") {
                        this[key].setSchema(newParam[key]);
                    } else {
                        this[key] = newParam[key];
                    }
                }


            }
        },

        getJSON: function() {

            var paramJSON = {};

            if (this.name) {
                paramJSON.name = this.name;
            }

            if (this.inLocation) {
                paramJSON.in = this.inLocation;
            }

            if (this.description) {
                paramJSON.description = this.description;
            }

            paramJSON.required = this.required;

            return paramJSON;
        }
    };

    let Responses = {

        setResponses: function setResponses(responses) {
            for (var httpCode in responses) {
                if (responses.hasOwnProperty(httpCode)) {
                    this[httpCode] = Object.create(Response);
                    this[httpCode].init();
                    this[httpCode].setResponse(responses[httpCode]);
                }
            }
        },

        addResponse: function(httpCode, description) {

            // this[httpCode] = new Response(description);
            this[httpCode] = Object.create(Response);
            this[httpCode].init(description);

        },

        /**
        */
        removeResponse: function(httpCode) {

            // this.responseList.forEach(function(resp, index) {
            //     if (resp.hasOwnProperty(httpCode)) {
            //         this.responseList.splice(index, 1);
            //         return;
            //     }
            // });
            if (this.hasOwnProperty(httpCode)) {
                delete this[httpCode];
            }
        },

        /**
        */
        getResponse: function(httpCode) {

            if (this.hasOwnProperty(httpCode)) {
                return this[httpCode];
            } else {
                return null;
            }

        },

        updateResponse: function(oldResponse, newResponse) {

            for (let key in newResponse) {
                if (newResponse.hasOwnProperty(key)) {
                    oldResponse[key] = newResponse[key];
                }
            }

        },

        /**
            Check to see if a response exists in the list
        */
        hasResponse: function(httpCode) {
            // var exists = false;

            // this.responseList.forEach(function(response, index, responseList){

            return this.hasOwnProperty(httpCode);
        }

    };

    let Response = {
        init: function(descrip) {
            this.description = descrip;
            this.schema = newSchema();
            this.headers = {};
            this.examples = {};
        },

        setResponse: function setReposne(newResponse) {
            for (var key in newResponse) {
                if (this.hasOwnProperty(key) && newResponse.hasOwnProperty(key)) {
                    if (key === "schema") {
                        this[key].setSchema(newResponse[key]);
                    } else {
                        this[key] = newResponse[key];
                    }
                }


            }
        }
    };

    let Schema = {
        init: function(title, description, type) {
            this.$ref = null;
            this.format = null;
            this.title = title || "";
            this.description = description || "";
            this.required = [];
            this.enum = [];
            this.type = type || "";
            this.properties = {};
            // this._isRequired
        },

        setSchema: function setSchema(schema) {
            // let privateProperties =
            for (var key in schema) {
                if (this.hasOwnProperty(key) && schema.hasOwnProperty(key)) {
                    this[key] = schema[key];
                }
            }
        },

        addProperty: function addProperty(propertyName) {
            // debugger;
            if (this.properties.hasOwnProperty(propertyName)) {
                UtilitiesService.toast("Property already exists on this definition.");
            } else {
                this.properties[propertyName] = newSchema();
                // this.sgSchemaObject.properties[propertyName].type = null;
            }

        },

        deleteProperty: function deleteProperty(propertyName) {
            if ($window.confirm("Are you sure you want to delete the property?")) {
                delete this.properties[propertyName];
            } else {
                $log.log("Don't delete property");
            }

        },

        addEnum: function addEnum(enumItem) {
            if (this.enum.indexOf(enumItem) === -1) {
                this.enum.push(enumItem);

            } else {
                $log.warn("item already added");
                UtilitiesService.toast("item already added", 3000);

            }
        },

        removeEnum: function removeEnum(enumItem) {
            let indexOfEnumItem = this.enum.indexOf(enumItem);


            if (indexOfEnumItem >= 0) {
                this.enum.splice(indexOfEnumItem, 1);
            } else {
                $log.warn("item already added");
                UtilitiesService.toast("item already added", 3000);
            }
        }
    };

    /**
     */
    function newDefinitions() {
        return Object.create(Definitions);
    }

    /**
     */
    function newSchema(title, description, type) {
        let temp = Object.create(Schema);
        temp.init(title, description, type);
        return temp;
    }

    /**
     */
    function newPath() {
        let temp = Object.create(Path);
        temp.init();
        return temp;
    }

    /**
     */
    function newResponses() {
        return Object.create(Responses);
    }

    /**
     */
    function newParameter(name, inLocation) {
        var temp = Object.create(Parameter);
        temp.init(name, inLocation);
        return temp;
    }

    /**
     */
    function newOperation() {
        let temp = Object.create(Operation);
        temp.init();
        return temp;
    }

    return {
        newPath,
        newOperation,
        newParameter,
        newResponses,
        newSchema,
        newDefinitions
    };
}
