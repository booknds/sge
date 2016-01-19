export default ObjectFactory;

function ObjectFactory(){


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
      this.responses = ResponseService.newResponses();
      this.schemes = null;
      this.deprecated = false;
      this.security = new Object();
    },
    addParameter: function(paramName, paramIn){

        //if(hasParameter.call(this, paramName, paramIn))
      this.parameters.push(ParameterService.newParameter(paramName, paramIn));

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
    hasParameter: function (name, inLoc){
      let found = false

      this.parameters.forEach(function(element, index, array){
        if(element.name === name && element.in === inLoc)
          found = true;
      });

      if(found)
        return true;
      else
        return false;
    },
  }

  let Parameter = {
    init: function(name, inLocation){
      this.name = name || "";
      this.inLocation = inLocation || "query";
      this.description = null;
      this.required = (this.inLocation === "path") ? true : false;
      this.schema = new Object();
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
      /*var response = null;

      this.responseList.forEach(function(resp, index, responseList){
        if(resp.hasOwnProperty(httpCode)){
          response = resp;
          return;
        }
      });

      return angular.copy(response);*/
      if(this.hasOwnProperty(httpCode))
        return this[httpCode];
      else
        return null;

    },

    /**
      Check to see if a response exists in the list
    */
    responseExists: function(httpCode){
      //var exists = false;

      //this.responseList.forEach(function(response, index, responseList){
      console.log("RESPONSE EXISTS FUNCTION");
      console.log(httpCode);
      console.log(this.responseList);
        if(this.hasOwnProperty(httpCode)){
          return true;
          //return;
        }else {
          return false;
        }
      //});

      //return exists;
    },

  };

  let Response = {
    init: function(descrip){
      this.description = descrip,
      this.schema = new Object(),
      this.headers = new Object(),
      this.examples = new Object()
    }
  };

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
    newOperation,
    newParameter,
    newResponses
  }
}
