"use strict";

let schemaEditorController = ["$scope", "$window", "PathService", "ObjectFactory", schemaEditorCtrl];

export default schemaEditorController;

function schemaEditorCtrl($scope, $window, PathService, ObjectFactory){

  /**
    * @name newResponseData
    * @desc Holds the state of the inputs. Only manipulated in the DOM
    * @type {Object}
   **/
  this.schema = {
    definition: this.sgContext,
  };

  this.formats = ['int32','int64', 'float', 'double', 'string', 'byte', 'binary', 'boolean', 'date', 'date-time', 'password', 'email', 'uuid'];
  this.types = ['integer', 'number', 'string', 'boolean'];

  this.toggleRequired = function(propertyName, isRequired){
    debugger;
    console.log("TOGGLE PROPERTY REQUIRED");
    console.log(propertyName, isRequired);
    if(isRequired){
      this.sgContext.required.push(propertyName);
    }else{
      for(var i = 0; i < this.sgContext.required.length; i++){
        if(this.sgContext.required[i] === propertyName){
          this.sgContext.required.splice(i, 1);
          return;
        }
      }
    }
  }

  this.toast = function(msg){
    var message = msg || "No toast supplied, but hello!!";
    Materialize.toast(msg, 2000);
  }

  this.addProperty = function(definitionName, propertyName){
    debugger;
    if(this.sgContext.properties.hasOwnProperty(propertyName)){
      Materialize.toast('Property already exists on this definition.');
    }else{
      this.sgContext.properties[propertyName] =  ObjectFactory.newSchema();
      //this.sgContext.properties[propertyName].type = null;
    }

    //if(tempDefniition.properties.hasOwnProperty)

    this.newProperty.name = "";

  }

  this.deleteProperty = function(propertyName){
    if($window.confirm('Are you sure you want to delete the property?')){
      delete this.sgContext.properties[propertyName];
    }else{
      console.log("Don't delete property")
    }
  }

}
