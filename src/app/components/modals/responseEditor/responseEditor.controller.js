
/**
 */
function ResponseModalCtrl($mdDialog) {

    this.updateResponse = function(newResponse) {
        debugger;
        $mdDialog.hide(newResponse);
    };

    this.deleteResponse = function() {
        $mdDialog.hide("delete");
    };

    this.cancel = function() {
        $mdDialog.cancel();
    };


}

let ResponseEditorController = ["$mdDialog", ResponseModalCtrl];

export default ResponseEditorController;
