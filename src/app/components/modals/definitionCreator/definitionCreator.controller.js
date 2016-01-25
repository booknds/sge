
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
      debugger;
      ds.addDefinition.call(ds, definitionName, description, 'object');
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
