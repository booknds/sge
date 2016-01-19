"use strict";
/* @ngInject */
export default function ParameterService(){

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

  function newParameter(name, inLocation){
    var temp = Object.create(Parameter);
    temp.init(name, inLocation);
    return temp;
  }

  return {
    newParameter
  };

}
