"use strict";

let DefintionCreationController = ["$scope", "$log", "UtilitiesService", "DefinitionsService", "$mdDialog", DefinitionCreationCtrl];

export default DefintionCreationController;

function DefinitionCreationCtrl($scope, $log, UtilitiesService, ds, $mdDialog){
    var vm = this;

    this.closeModal=false;

    vm.newDefinition = {
        name:null,
        description:null
    };

    vm.addDefinition = function(definitionName, description){

        debugger;
        try {
            //debugger;
            ds.addDefinition.call(ds, definitionName, description, "object");
        } catch (e) {
            $log.log(e);
            UtilitiesService.toast(e, 3000);
        }

        this.closeModal = true;
        vm.newDefinition = {
            name:null,
            description:null
        };

        $mdDialog.hide("added definition");

    };
}
