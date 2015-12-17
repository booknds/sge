swaggerGE.factory("DefinitionsService", [function(){

  var ds = this;

  var definitions = {};

  ds.definitions = definitions;


  function Definition(objectName){
    //this.
  }

  Definition.prototype = {
  //  set
  }


  ds.addDefinition = function(definitionName){
    if(hasDefinition(definitionName))
      throw "Cannot Add, Definition Already Exists"
    else{
      console.log('adding definitiion');
      definitions[definitionName] = {
        poop:'hi'
      }
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


  return ds;

}]);
