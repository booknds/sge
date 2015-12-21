swaggerGE.controller("DefinitionCreationController", ['$scope', 'DefinitionsService',
  function($scope, ds){
    var vm = this;

    $scope.closeModal=false;

    vm.newDefinition = {
      name:null,
    };

    vm.addDefinition = function(definitionName, description){

      try{
        ds.addDefinition(definitionName, description);
      }catch(e){
        console.log(e);
        Materialize.toast(e, 3000);
      }

      $scope.closeModal = true;
      vm.newDefinition.name=null;

    }



  }]);
