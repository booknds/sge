swaggerGE.factory("DefinitionsService", [function(){

  var ds = this;

  function Schema(title, description, type){
    this.$ref = null;
    this.format = null;
    this.title = title || "";
    this.description = description || "";
    this.required = new Array();
    this.enum = null;
    this.type = type || "Object";
    this.properties = {};
  }

  Schema.prototype = {};

  function Definitions(){
    //this[objectName] = new Schema();

    //return this[objectName];
    //return new Object();
    //this.poop = "poop";
  }

  Definitions.prototype = {

    addDefinition:function(definitionName, description, type){
      this[definitionName] = new Schema(definitionName, description, type);
    },

    hasDefinition: function(definitionName){
      if(this.hasOwnProperty(definitionName))
        return true;
      else
        return false;
    },

    getDefinition: function(definitionName){
      return this[definitionName];
    },
  }


  ds.addDefinition = function(definitionName, description, type){
    if(hasDefinition(definitionName))
      throw "Cannot Add, Definition Already Exists"
    else{
      console.log('adding definitiion');
      //definitions[definitionName] = {
      //  poop:'hi'
      //}
      ds.definitions.addDefinition(definitionName, description, type);
      console.log(definitions);
      console.log(ds.definitions);
    }
  }

  function hasDefinition(definitionName){
    if(definitions.hasOwnProperty(definitionName))
      return true;
    else
      return false;
  }

  ds.addProperty = function(definitionName, propertyName){

    console.log("DS add property");
    console.log(definitionName, propertyName);

    if(hasProperty(definitionName, propertyName)){
      throw "Property '" + propertyName + "' already exists in definition: " + definitionName;

    }else {
        definitions[definitionName].properties[propertyName] = new Schema();
        definitions[definitionName].properties[propertyName].type = null;
    }

  };

  function hasProperty(definitionName, propertyName){
    console.log("HAS PROPERTY");
    console.log(definitionName, propertyName);
    if(definitions[definitionName].properties.hasOwnProperty(propertyName))
      return true;
    else
      return false;
  }

  var definitions = new Definitions();

  ds.definitions = definitions;
  console.log(definitions);

  return ds;

}]);
