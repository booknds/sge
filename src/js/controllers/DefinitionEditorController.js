swaggerGE.controller("DefinitionEditorController", ["$scope", "DefinitionsService", "DefinitionEditorModalService",
  function($scope, ds, dems){

    var vm = this;

    vm.tempDefinition = {
      name:null,
      value:null,
    };
    vm.originalDefinition = null;

    vm.types = ['int32','int64', 'float', 'double', 'string', 'byte', 'binary', 'boolean', 'date', 'date-time', 'password'];

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
