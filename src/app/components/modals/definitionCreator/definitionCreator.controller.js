
let DefintionCreationController = ["$log", "UtilitiesService", "DefinitionsService", "$mdDialog", DefinitionCreationCtrl];

export default DefintionCreationController;

/**
 */
function DefinitionCreationCtrl($log, UtilitiesService, ds, $mdDialog) {

    // this.closeModal=false;

    this.newDefinition = setNewDefinition();

    this.addDefinition = function(definitionName, description) {

        debugger;
        // try {
        //     // debugger;
        //     ds.addDefinition.call(ds, definitionName, description, "object");
        // } catch (e) {
        //     $log.log(e);
        //     UtilitiesService.toast(e, 3000);
        // }
        // this.closeModal = true;

        ds.addDefinition.call(ds, definitionName, description, "object");
        this.newDefinition = setNewDefinition();
        $mdDialog.hide("added definition");

    };

    this.cancel = function() {
        $mdDialog.cancel();
    };

    /**
     */
    function setNewDefinition() {
        return {
            name: null,
            description: null
        };
    }
}
