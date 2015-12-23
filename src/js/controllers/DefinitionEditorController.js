swaggerGE.controller("DefinitionEditorController", ["$scope", "DefinitionsService", "DefinitionEditorModalService",
  function($scope, ds, dems){

    var vm = this;

    vm.tempDefinition = {
      name:null,
      value:null,
    };
    vm.originalDefinition = null;

    vm.newProperty = {
      name: null,
    };

    vm.formats = ['int32','int64', 'float', 'double', 'string', 'byte', 'binary', 'boolean', 'date', 'date-time', 'password', 'email', 'uuid'];
    vm.types = ['integer', 'number', 'string', 'boolean'];

    vm.toast = function(msg){
      var message = msg || "No toast supplied, but hello!!";
      Materialize.toast(msg, 2000);
    }

    vm.addProperty = function(definitionName, propertyName){

      try{
        ds.addProperty(definitionName, propertyName);
      }catch(e){
          console.log(e);
          Materialize.toast(e, 3000);
      }

      //if(tempDefniition.value.properties.hasOwnProperty)

      vm.newProperty.name = "";

    }

    vm.togglePropertyRequired = function(propertyName, isRequired){
      console.log("TOGGLE PROPERTY REQUIRED");
      console.log(propertyName, isRequired);
      if(isRequired){
        vm.tempDefinition.value.required.push(propertyName);
      }else{
        for(var i = 0; i < vm.tempDefinition.value.required.length; i++){
          if(vm.tempDefinition.value.required[i] === propertyName){
            vm.tempDefinition.value.required.splice(i, 1);
            return;
          }

        }
      }
    }

    $scope.$watch(function(){return dems.currentDefinition;}, function(newVal){

        if(newVal.name){
          console.log("hit current definition updated");
          var currentDefinition = newVal;
          vm.originalDefinition = currentDefinition;

          vm.tempDefinition.name = vm.originalDefinition.name;
          vm.tempDefinition.value = angular.copy(vm.originalDefinition.value) ;
        }

      }, true);

}])
