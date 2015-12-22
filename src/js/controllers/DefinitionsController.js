swaggerGE.controller("DefinitionsController", ["$scope", "DefinitionsService", "DefinitionEditorModalService",
  function($scope, ds, dems){

    var vm = this;

    vm.definitions = ds.definitions;

    $scope.$watch(function(){return ds.definitions;}, function(newVal){
      console.log("DEFINITIONS HIT");
      if(newVal){
        console.log(newVal);
        console.log("DEFINITIONS CHANGED");
        vm.definitions = ds.definitions;
      }
    }, true);

    vm.headers = ['Name', 'Description', 'Type', 'Required', 'Enum'];
    vm.Types = ['int32','int64', 'float', 'double', 'string', 'byte', 'binary', 'boolean', 'date', 'date-time', 'password'];

    vm.showDefinitionProperty = function show(def, prop){
      var allowedProperties = ['name', 'description', 'type', 'required', 'enum'];

      console.log(def, prop);

      var show = false;

      if(!def[prop]){
        for(var i = 0; i < allowedProperties.length; i++){
          if(prop === allowedProperties)
            show = true;
        }
      }

      console.log("returning " + show);
      return show;
    }

    vm.initDefinitionEditorModal = function(definitionName, definitionValue){
      console.log("initDefinitionEditorModal");
      try{
        //var currentResponse = PathService.getResponse(pathName, operation, httpCode);
        console.log(definitionName);
        console.log(definitionValue);
        dems.definitionToUpdate(definitionName, definitionValue);
      }catch(e){
        console.log(e);
        Materialize.toast(e, 3000);
        return;
      }
    }

}])
