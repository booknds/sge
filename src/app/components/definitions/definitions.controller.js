
let definitionsController = ["$scope", "$window", "DefinitionsService", "DefinitionEditorModalService", DefinitionsCtrl];

export default definitionsController;

function DefinitionsCtrl($scope, $window, ds, dems){

  var vm = this;

  // debugger;

  vm.definitions = ds.definitions;
  vm.headers = ['Name', 'Description', 'Type', 'Required', 'Enum'];
  vm.Types = ['int32','int64', 'float', 'double', 'string', 'byte', 'binary', 'boolean', 'date', 'date-time', 'password'];

  $scope.focusDefinitionModal = false;

  $scope.openFocusDefinitionModal = function(){
    $scope.focusDefinitionModal = true;
    console.log("toggle focus: focusPathModal ==" + $scope.focusDefinitionModal)
    //$scope.focusPathModal = !$scope.focusPathModal;
  }

  // $scope.$watch(function(){return ds;}, function(newVal){
  //   console.log("DEFINITIONS HIT");
  //   debugger;
  //   if(newVal){
  //     console.log(newVal);
  //     console.log("DEFINITIONS CHANGED");
  //     vm.definitions = ds;
  //     console.log(ds)
  //   }
  // }, true);

  // vm.showDefinitionProperty = function show(def, prop){
  //   var allowedProperties = ['name', 'description', 'type', 'required', 'enum'];
  //
  //   console.log(def, prop);
  //
  //   var show = false;
  //
  //   if(!def[prop]){
  //     for(var i = 0; i < allowedProperties.length; i++){
  //       if(prop === allowedProperties)
  //         show = true;
  //     }
  //   }
  //
  //   console.log("returning " + show);
  //   return show;
  // }

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

  vm.deleteDefinition = function(definitionName){
    if($window.confirm('Are you sure you want to delete the definition?')){
      ds.deleteDefinition(definitionName);
    }else{
      console.log("Don't delete definitions");
    }

  }

}
