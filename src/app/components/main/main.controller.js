let compilerArray = ["$scope", "$log", "CompilerService", "FileSaver", "Blob", CompilerCtrl];

export default compilerArray;

/**
 */
function CompilerCtrl($scope, $log, cs, FileSaver, Blob) {

    this.compiledDocument = cs.compiled;

    this.recompile = function() {
        cs.recompile();
    };

    this.download = function(text) {
        var data = new Blob([angular.toJson(text)], { type: "application/json" });
        FileSaver.saveAs(data, "swagger.json");
    };

    $scope.$watch(
        function() {
            return cs.compiled;
        },
        function(newVal) {
            $log.log("COMPILKED CHANGED");
            $log.log(newVal);
            if (newVal) {
                this.compiledDocument = cs.compiled;
                // vm.definitions = ds.definitions;
            }
        }.bind(this), true);

}
