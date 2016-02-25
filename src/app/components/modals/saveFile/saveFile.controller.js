let saveFileController = ["CompilerService", "FileSaver", "Blob", "$mdDialog", SaveFileController];

export default saveFileController;

/**
 */
function SaveFileController(CompilerService, FileSaver, Blob, $mdDialog) {

    this.fileData = resetData();

    this.save = function download(text) {
        CompilerService.recompile();
        var compiled = CompilerService.compiled;
        if (Object.keys(compiled).length === 0) {
            return;
        }

        var data = new Blob([angular.toJson(compiled, true)], { type: "application/json" });
        FileSaver.saveAs(data, ((text || "swagger") + ".json"));

        $mdDialog.hide("saved!");
    };

    this.cancel = function() {
        $mdDialog.cancel();
    };

    /**
     */
    function resetData() {
        return {
            name: null
        };
    }


}
