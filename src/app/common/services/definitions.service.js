let definitions = ["ObjectFactory", DefinitionsService];

export default definitions;

function DefinitionsService(ObjectFactory){

  this.addDefinition = function(definitionName, description, type){
    debugger;
    if(hasDefinition(definitionName))
      throw "Cannot Add, Definition Already Exists"
    else{
      console.log('adding definitiion');
      //definitions[definitionName] = {
      //  poop:'hi'
      //}
      this.definitions.addDefinition(definitionName, description, type);
      // console.log(definitions);
      // console.log(this.definitions);
    }
  }

  this.setDefinitions = function setDefinitions(newDefinitions){
    debugger;
    this.definitions.setDefinitions(newDefinitions);
  };

  this.clearDefinitions = function clearDefinitions(){
    this.definitions.clearDefinitions();
  };

  function hasDefinition(definitionName){
    if(definitions.hasOwnProperty(definitionName))
      return true;
    else
      return false;
  }

  this.addProperty = function(definitionName, propertyName){

    // console.log("this add property");
    // console.log(definitionName, propertyName);

    if(hasProperty(definitionName, propertyName)){
      throw "Property '" + propertyName + "' already exists in definition: " + definitionName;

    }else {

        definitions[definitionName].properties[propertyName] = ObjectFactory.newSchema();
        //definitions[definitionName].properties[propertyName].type = null;
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

  this.updateDefinition = function(originalDefinition, updatedDefinition){
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

        this.addDefinition(uName);

        var currentDefinition = definitions[uName];

        for(var key in currentDefinition){
            currentDefinition[key] = uValue[key];
        }

        delete definitions[oName];

      }
    }

  }

  this.newSchema = function(title, description, type){
    // let temp = Object.create(Schema);
    // temp.init(title, description, type);
    // return temp;
    return ObjectFactory.newSchema(title, description, type);
  };

  this.deleteDefinition = function(definitionName){
    delete this.definitions[definitionName];
  }

  var definitions = ObjectFactory.newDefinitions();

  this.definitions = definitions;
  //console.log(definitions);

  //debugger;

  return this;

}
