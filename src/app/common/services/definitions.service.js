let definitions = ['$window', DefinitionsService];

export default definitions;

function DefinitionsService($window){

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

  //Schema.prototype = {};

  let Definitions = {
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

  ds.updateDefinition = function(originalDefinition, updatedDefinition){
    console.log("SERVICE - update definition");
    var oName = originalDefinition.name,
        oValue = originalDefinition.value,
        uName = updatedDefinition.name,
        uValue = updatedDefinition.value;

    if(oName === uName){
      var definitionToUpdate = definitions[oName];

      for(var key in definitionToUpdate){
        definitionToUpdate[key] = uValue[key];
      }

    }else{

      if(hasDefinition(uName)){

        throw "Definition already exists, cannot change definition name."

      }else{

        ds.addDefinition(uName);

        var currentDefinition = definitions[uName];

        for(var key in currentDefinition){
            currentDefinition[key] = uValue[key];
        }

        delete definitions[oName];

      }
    }

  }

  ds.newSchema = function(title, description, type){
    return new Schema(title, description, type);
  }

  ds.deleteDefinition = function(definitionName){
    delete ds.definitions[definitionName];
  }

  var definitions = Object.create(Definitions);

  ds.definitions = definitions;
  //console.log(definitions);

  return ds;

}
