let ParameterEditorController = ["$scope", "$mdDialog", "UtilitiesService", ParameterModalCtrl];

export default ParameterEditorController;

/**
 */
function ParameterModalCtrl($scope, $mdDialog, UtilitiesService) {

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
        // logic is placed here to verify the update before closing the dialog
<<<<<<< HEAD
        var inBody = (this.tempParam.inLocation === "body");
        var hasType = (this.tempParam.type.length > 0);
=======
        debugger;
        var inBody = (this.tempParam.inLocation === "body");
        var hasType = (this.tempParam.type);
>>>>>>> issue13

        if (inBody && hasType) {
            this.tempParam.type = null;
            UtilitiesService.toast("inLocation: Body cannot have a type.");
            return;
        }
        if (!inBody && !hasType) {
            UtilitiesService.toast("Type is required if not in 'Body'");
            return;
        }

        $mdDialog.hide(newParameter);
    };

    this.deleteParameter = function deleteParamter() {
        $mdDialog.hide("deleteParameter");
    };

    this.cancel = function cancel() {
        $mdDialog.cancel();
    };

}

