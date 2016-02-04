import angular from "angular";

let DefinitionEditorController = ["$scope", "$log", "$window", "UtilitiesService", "DefinitionsService", "DefinitionEditorModalService", DefinitionEditorCtrl];

export default DefinitionEditorController;

function DefinitionEditorCtrl($scope, $log, $window, UtilitiesService, ds, dems){

    var vm = this;

    vm.tempDefinition = {
        name:null,
        value:null
    };
  
    vm.originalDefinition = null;

    vm.newProperty = {
        name: null
    };

  // vm.formats = ["int32","int64", "float", "double", "string", "byte", "binary", "boolean", "date", "date-time", "password", "email", "uuid"];
  // vm.types = ["integer", "number", "string", "boolean"];

    //this.closeModal = false;

  // vm.toast = function(msg){
  //   var message = msg || "No toast supplied, but hello!!";
  //   Materialize.toast(msg, 2000);
  // }
  //
  // vm.addProperty = function(definitionName, propertyName){
  //   /*
  //   try{
  //     ds.addProperty(definitionName, propertyName);
  //   }catch(e){
  //       $log.log(e);
  //       Materialize.toast(e, 3000);
  //   }
  //   */
  //
  //   if(vm.tempDefinition.value.properties.hasOwnProperty(propertyName)){
  //     Materialize.toast("Property already exists on this definition.");
  //   }else{
  //     vm.tempDefinition.value.properties[propertyName] =  ds.newSchema();
  //     vm.tempDefinition.value.properties[propertyName].type = null;
  //   }
  //
  //   //if(tempDefniition.value.properties.hasOwnProperty)
  //
  //   vm.newProperty.name = "";
  //
  // }

  // vm.togglePropertyRequired = function(propertyName, isRequired){
  //   $log.log("TOGGLE PROPERTY REQUIRED");
  //   $log.log(propertyName, isRequired);
  //   if(isRequired){
  //     vm.tempDefinition.value.required.push(propertyName);
  //   }else{
  //     for(var i = 0; i < vm.tempDefinition.value.required.length; i++){
  //       if(vm.tempDefinition.value.required[i] === propertyName){
  //         vm.tempDefinition.value.required.splice(i, 1);
  //         return;
  //       }
  //
  //     }
  //   }
  // }

    vm.updateDefinition = function(originalDefinition, newDefinition){
        $log.log("CONTROLLER - Update definition");
        try{
            ds.updateDefinition(originalDefinition, newDefinition);
            this.closeModal = true;
        }catch(e){
            $log.log(e);
            UtilitiesService.toast(e, 3000);
        }
    };

  // vm.deleteProperty = function(propertyName){
  //   if($window.confirm("Are you sure you want to delete the property?")){
  //     delete vm.tempDefinition.value.properties[propertyName];
  //   }else{
  //     $log.log("Don"t delete property")
  //   }
  // }

    $scope.$watch(function(){return dems.currentDefinition;}, function(newVal){

        if(newVal.name){
            $log.log("hit current definition updated");
            var currentDefinition = newVal;
            vm.originalDefinition = currentDefinition;

            vm.tempDefinition.name = vm.originalDefinition.name;
            vm.tempDefinition.value = angular.copy(vm.originalDefinition.value) ;
        }

    }, true);

}
