
let DefinitionEditorController = ["$mdDialog", DefinitionEditorCtrl];

export default DefinitionEditorController;

/**
 */
function DefinitionEditorCtrl($mdDialog) {

    this.updateDefinition = function(newDefinition) {
        $mdDialog.hide(newDefinition);

    };

    this.cancel = function() {
        $mdDialog.cancel();
    };

}
