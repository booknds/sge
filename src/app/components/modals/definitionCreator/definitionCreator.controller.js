
let DefintionCreationController = ['$scope', 'DefinitionsService', DefinitionCreationCtrl];

export default DefintionCreationController;

function DefinitionCreationCtrl($scope, ds){
  var vm = this;

  this.closeModal=false;

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

    this.closeModal = true;
    vm.newDefinition = {
      name:null,
      description:null,
    };

  }
}
