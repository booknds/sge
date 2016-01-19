let operations = ["ParameterService", "ResponseService", OperationsService];

export default operations;

function OperationsService(ParameterService, ResponseService){

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
      this.parameters.push(ParameterService.newParameter(paramName, paramIn));
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
      // if(oldParameter.name !== newParameter.name && oldParameter.inLocation !== newParameter.inLocation){
      //
      // }
      let original = this.getParameter(oldParameter.name, oldParameter.inLocation);

      original = newParameter;
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



  function newOperation(){
    let temp = Object.create(Operation);
    temp.init();
    return temp;
  }

  return {
    newOperation
  };

}
