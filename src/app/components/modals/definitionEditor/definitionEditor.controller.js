
let DefinitionEditorController = ["$scope", "$log", "$window", "UtilitiesService", "DefinitionsService", "$mdDialog", DefinitionEditorCtrl];

export default DefinitionEditorController;

/**
 */
function DefinitionEditorCtrl($scope, $log, $window, UtilitiesService, ds, $mdDialog) {

    this.updateDefinition = function(newDefinition) {
        debugger;
        $mdDialog.hide(newDefinition);

    };

    this.cancel = function() {
        $mdDialog.cancel();
    };

}
