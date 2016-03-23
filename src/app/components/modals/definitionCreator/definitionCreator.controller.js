
let DefintionCreationController = ["DefinitionsService", "$mdDialog", DefinitionCreationCtrl];

export default DefintionCreationController;

/**
 * The controller for the definition creator dialog
 * @constructor
 * @param {object} DefinitionService - Holds States and functions of Definitions
 * @param {object} $mdDialog - Handles dialog interaction
 */
export function DefinitionCreationCtrl(DefinitionService, $mdDialog) {

    this.newDefinition = setNewDefinition();

    this.addDefinition = function(definitionName, description) {

        DefinitionService.addDefinition(definitionName, description, "object");
        this.newDefinition = setNewDefinition();
        $mdDialog.hide("added definition");

    };

    this.cancel = function() {
        $mdDialog.cancel();
    };

    /**
     * Returns a new state for the controller inputs
     * @returns {object} - a fresh state
     */
    function setNewDefinition() {
        return {
            name: null,
            description: null
        };
    }
}
