let operations = ["ParameterService", "ResponseService", OperationsService];

export default operations;

function OperationsService(ParameterService, ResponseService){


  var Operation = {
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

        if(hasParameter.call(this, paramName, paramIn))
          this.parameter.push(ParameterService.newParameter(paramName, paramIn));

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

    }
  }

  function hasParameter(name, inLoc){
    var found = false

    this.parameters.forEach(function(element, index, array){
      if(element.name === name && element.in === inLoc)
        found = true;
    });

    if(found)
      return true;
    else
      return false;
  }

  function newOperation(){
    let temp = Object.create(Operation);
    temp.init();
    return temp;
  }

  return {
    newOperation
  }

}
