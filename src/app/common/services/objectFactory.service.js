export default ObjectFactory;

function ObjectFactory(){

  let Path ={
    init:function(){
      this.get = null;
      this.post = null;
      this.put = null;
      this.delete = null;
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
      this[operation] = null;
    },
  };

  let Definitions = {
    addDefinition:function(definitionName, description, type){
      let temp = Object.create(Schema);
      temp.init(definitionName, description, type);
      this[definitionName] = temp;
    },

    hasDefinition: function(definitionName){
      if(this.hasOwnProperty(definitionName))
        return true;
      else
        return false;
    },

    clearDefinitions: function(){
      for(var key in this){
        delete this[key];
      }
    },

    setDefinitions: function(newDefinitions){
      for(var key in newDefinitions){
        this[key] = newDefinitions[key];
      }
    },

    getDefinition: function(definitionName){
      return this[definitionName];
    },
  };

  let Operation = {
    init: function(){
      this.tags = null;
      this.summary = null;
      this.description = null;
      this.externalDocs = new Object();
      this.operationId = null;
      this.consumes = null;
      this.produces = null;
      this.parameters = new Array();
      this.responses = newResponses();
      this.schemes = null;
      this.deprecated = false;
      this.security = new Object();
    },

    addParameter: function(paramName, paramIn){
      this.parameters.push(newParameter(paramName, paramIn));
    },

    getParameter: function(name, inLoc){
      var parameter = null;
        this.parameters.forEach(
          function(element, index, array){
            console.log(element);
            if(element.name === name && element.inLocation === inLoc){
              parameter = element;
              return;
            }
          }
        );

      return parameter;
    },

    hasParameter: function (name, inLoc){
      let found = false

      this.parameters.forEach(function(element, index, array){
        if(element.name === name && element.inLocation === inLoc)
          found = true;
      });

      if(found)
        return true;
      else
        return false;
    },

    updateParameter: function(oldParameter, newParameter){

      let original = this.getParameter(oldParameter.name, oldParameter.inLocation);

      for(let key in newParameter){
        original[key] = newParameter[key];
      }

    },

    getJSON: function(){
        var operationJSON = {};

        for(var property in this){
            console.log(property);
            if(this[property]){
                //if(property === "parameters");
                operationJSON[property] = this[property];

            }
        };

        return operationJSON;

    },

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

    getJSON: function(){

        var paramJSON = {};

        if(this.name){
            paramJSON.name = this.name;
        }

        if(this.inLocation){
            paramJSON.in = this.inLocation;
        }

        if(this.description){
            paramJSON.description = this.description;
        }

        paramJSON.required = this.required;

        return paramJSON;
    }
  };

  let Responses = {

    addResponse: function(httpCode, description){

      //this[httpCode] = new Response(description);
      this[httpCode] = Object.create(Response);
      this[httpCode].init(description);

    },

    /**
    */
    removeResponse: function(httpCode){

      this.responseList.forEach(function(resp, index, responseList){
        if(resp.hasOwnProperty(httpCode)){
          this.responseList.splice(index, 1);
          return;
        }
      });

    },

    /**
    */
    getResponse: function(httpCode){

      if(this.hasOwnProperty(httpCode))
        return this[httpCode];
      else
        return null;

    },
    updateResponse: function(oldResponse, newResponse){

      for(let key in newResponse){
        oldResponse[key] = newResponse[key];
      }

    },

    /**
      Check to see if a response exists in the list
    */
    hasResponse: function(httpCode){
      //var exists = false;

      //this.responseList.forEach(function(response, index, responseList){

        return this.hasOwnProperty(httpCode)
    },

  };

  let Response = {
    init: function(descrip){
      this.description = descrip,
      this.schema = newSchema(),
      this.headers = new Object(),
      this.examples = new Object()
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
    newDefinitions,
  }
}
