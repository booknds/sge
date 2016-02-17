export default ObjectFactory;

function ObjectFactory($log, UtilitiesService){

    let Path ={
        init:function(){
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
        addOperation: function(operation){
            this[operation] = newOperation();
        },

        removeOperation: function(operation){
            delete this[operation];
            //this[operation] = null;
        },

        setPath: function setPath(newPath){
            debugger;
            for (var key in newPath) {
                if (newPath.hasOwnProperty(key)) {
                    this[key] = newOperation();
                    this[key].setOperation(newPath[key]);
                }
            }
        }
    };

    let Definitions = {

        addDefinition:function(definitionName, description, type){
            let temp = Object.create(Schema);
            temp.init(definitionName, description, type);
            this[definitionName] = temp;
        },

        hasDefinition: function(definitionName){
            if (this.hasOwnProperty(definitionName)){
                return true;
            } else {
                return false;
            }
        },

        clearDefinitions: function(){
            for (var key in this) {
                delete this[key];
            }
        },

        setDefinitions: function(newDefinitions){
            for (var definition in newDefinitions) {
                this[definition] = Object.create(Schema);
                this[definition].init(definition);
                this[definition].setSchema(newDefinitions[definition]);
                // temp.init(definitionName, description, type);
                // this[key] = newDefinitions[key];
            }
        },

        getDefinition: function(definitionName){
            return this[definitionName];
        }
    };

    let Operation = {
        init: function(){
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

        addParameter: function(paramName, paramIn){
            this.parameters.push(newParameter(paramName, paramIn));
        },

        setOperation: function setOperation(newOperation){
            for (var key in newOperation) {
                if (this.hasOwnProperty(key) && newOperation.hasOwnProperty(key)) {

                    if (key === "responses") {
                        this[key] = newResponses();
                        this[key].setResponses(newOperation[key]);

                    } else if (key === "parameters") {
                        var i = 0,
                            max = newOperation[key].length;

                        //go through each parameter create a new one and copy the passed parameter to the newly created one
                        for (i; i < max; i += 1) {
                            this[key].push(newParameter());
                            this[key][i].setParameter(newOperation[key][i]);
                        }
                        // this[key].push(newParameter()); //addParameter();

                    } else {
                        this[key] = newOperation[key];
                    }
                }
            }
        },

        getParameter: function(name, inLoc){
            var parameter = null;
            this.parameters.forEach(function(element){
                // console.log(element);
                if (element.name === name && element.inLocation === inLoc) {
                    parameter = element;
                    return;
                }
            });

            return parameter;
        },

        hasParameter: function (name, inLoc){
            let found = false;

            this.parameters.forEach(function(element){
                if (element.name === name && element.inLocation === inLoc){
                    found = true;
                }
            });

            if (found) {
                return true;
            } else {
                return false;
            }
        },

        updateParameter: function(oldParameter, newParameter){

            let original = this.getParameter(oldParameter.name, oldParameter.inLocation);

            for(let key in newParameter){
                original[key] = newParameter[key];
            }

        },

        addType: function addType(listType, type){
            //check if list exists
            if (listType !== "consumes" && listType !== "produces" && listType !== "schemes"){
                $log.warn("List does not exist");
                UtilitiesService.toast("List does not exist", 3000);

            }

            //check if type exists
            if(type){
                //check if type is already in the list
                if(this[listType].indexOf(type) === -1){
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

        removeType: function removeType(listType, type){
            //check if list exists
            if (listType !== "consumes" && listType !== "produces" && listType !== "schemes"){
                $log.warn("List does not exist");
                UtilitiesService.toast("List does not exist", 3000);
            }

            let index = this[listType].indexOf(type);

            if(index >= 0){
                this[listType].splice(index, 1);
            
            } else {
                $log.warn("Type already deleted");
                UtilitiesService.toast("Type already deleted", 3000);
            }
        },

        getJSON: function(){
            var operationJSON = {};

            for(var property in this){
                // console.log(property);
                if(this[property]){
                    // if(property === "parameters");
                    operationJSON[property] = this[property];
                }
            }

            return operationJSON;

        }

    };

    let Parameter = {
        init: function(name, inLocation){
            this.name = name || "";
            this.inLocation = inLocation || "query";
            this.description = null;
            this.required = (this.inLocation === "path") ? true : false;
            this.schema = newSchema();
            this.type = "";
            this.format ="";
            this.allowEmptyValue = false;
            this.items= new Object();
            this.collectionFormat = "";
        },

        setParameter: function setParameter(newParameter) {
            for (var key in newParameter) {
                if (this.hasOwnProperty(key) && newParameter.hasOwnProperty(key)) {
                    if (key === "schema") {
                        this[key].setSchema(newParameter[key]);
                    } else {
                        this[key] = newParameter[key];
                    }
                }


            }
        },

        getJSON: function(){

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

        setResponses: function setResponses(newResponses) {
            for (var httpCode in newResponses) {
                this[httpCode] = Object.create(Response);
                this[httpCode].init();
                this[httpCode].setResponse(newResponses[httpCode]);
            }
        },

        addResponse: function(httpCode, description){

            //this[httpCode] = new Response(description);
            this[httpCode] = Object.create(Response);
            this[httpCode].init(description);

        },

        /**
        */
        removeResponse: function(httpCode){

            this.responseList.forEach(function(resp, index){
                if (resp.hasOwnProperty(httpCode)) {
                    this.responseList.splice(index, 1);
                    return;
                }
            });

        },

        /**
        */
        getResponse: function(httpCode){

            if (this.hasOwnProperty(httpCode)){
                return this[httpCode];
            } else {
                return null;
            }

        },

        updateResponse: function(oldResponse, newResponse){

            for (let key in newResponse) {
                oldResponse[key] = newResponse[key];
            }

        },

        /**
            Check to see if a response exists in the list
        */
        hasResponse: function(httpCode){
            //var exists = false;

            //this.responseList.forEach(function(response, index, responseList){

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
        init:function(title, description, type){
            this.$ref = null;
            this.format = null;
            this.title = title || "";
            this.description = description || "";
            this.required = new Array();
            this.enum = null;
            this.type = type || "";
            this.properties = {};
        },

        setSchema: function setSchema(newSchema) {
            for (var key in newSchema) {
                if (this.hasOwnProperty(key) && newSchema.hasOwnProperty(key)) {
                    this[key] = newSchema[key];
                }
            }
        }
    };

    function newDefinitions(){
        return Object.create(Definitions);
    }

    function newSchema(title, description, type){
        let temp = Object.create(Schema);
        temp.init(title, description, type);
        return temp;
    }

    function newPath(){
        let temp = Object.create(Path);
        temp.init();
        return temp;
    }

    function newResponses(){
        return Object.create(Responses);
    }

    function newParameter(name, inLocation){
        var temp = Object.create(Parameter);
        temp.init(name, inLocation);
        return temp;
    }

    function newOperation(){
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
