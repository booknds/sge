(function(){
  "use strict";

  angular
    .module("SwaggerGraphicalEditor")
    .controller("DefinitionCreationController", ['$scope', 'DefinitionsService', DefinitionCreationCtrl]);

  function DefinitionCreationCtrl($scope, ds){
    var vm = this;

    $scope.closeModal=false;

    vm.newDefinition = {
      name:null,
      description:null,
    };

    vm.addDefinition = function(definitionName, description){

      try{
        ds.addDefinition(definitionName, description);
      }catch(e){
        console.log(e);
        Materialize.toast(e, 3000);
      }

      $scope.closeModal = true;
      vm.newDefinition = {
        name:null,
        description:null,
      };

    }
  }

})();
