let ParameterEditorController = ["$scope", "$mdDialog", ParameterModalCtrl];

export default ParameterEditorController;

/**
 */
function ParameterModalCtrl($scope, $mdDialog) {

    this.paramOptions = {
        format: ["int32", "int64", "float", "double", "string", "byte", "binary", "boolean", "date", "date-time", "password"],
        type: ["string", "number", "integer", "boolean", "array", "file"],
        collectionFormat: ["csv", "ssv", "tsv", "pipes", "multi"]
    };

    this.locationTypes = ["path", "query", "header", "body", "formData"];

    $scope.$watch(
        function() {
            if (this.tempParam) {
                return this.tempParam.inLocation;
            } else {
                return null;
            }
        }.bind(this),
        function(newVal) {
            if (newVal === "path") {
                this.tempParam.required = true;
            }
        }.bind(this));


    this.updateParameter = function updateParameter(newParameter) {

        $mdDialog.hide(newParameter);
    };

    this.deleteParameter = function deleteParamter() {
        $mdDialog.hide("delete");
    };

    this.cancel = function cancel() {
        $mdDialog.cancel();
    };

}

