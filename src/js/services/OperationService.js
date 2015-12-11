"use strict";
swaggerGE.factory("OperationService", ["ParameterService",
function(ParameterService){

  var Operation = function(){
      this.tags = null;
      this.summary = null;
      this.descripiton = null;
      this.externalDocs = new Object();
      this.operationId = null;
      this.consumes = null;
      this.produces = null;
      this.parameters = ParameterService.newParameters();
      this.responses = new Object();
      this.schemes = null;
      this.deprecated = false;
      this.security = new Object();
  };

  Operation.prototype = {

      addParameter: function(paramName, paramIn){
          //if the parameter does not exist for this operation add it.
          if(!this.parameters.hasParameter){
              this.parameters.addParameter(paramName, paramIn);
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

      }



  };

  function newOperation(){
    return new Operation();
  }

  return {
    newOperation:newOperation,
  }

}]);
