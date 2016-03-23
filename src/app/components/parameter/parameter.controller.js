import template from "../modals/parameterEditor/parameterEditor.html";
import controller from "../modals/parameterEditor/parameterEditor.controller";

let ParameterController = ["$mdDialog", "$document", "$mdMedia", "PathService", ParameterCtrl];

export default ParameterController;

/**
 */
function ParameterCtrl($mdDialog, $document, $mdMedia, PathService) {

    this.formData = {
        inLocationList: ["path", "query", "header", "body", "formData"],
        types: ["string", "number", "integer", "boolean", "array", "file"]
    };

    this.addParam = function(paramName, paramInLocation, paramType) {

        PathService.addNewParam(this.operationObj, paramName, paramInLocation, paramType);

        // reset input data
        // $scope.addParameter.$setPristine();
        this.newParamData[this.operationType] = resetNewParamData();

    };

    this.showParamEditor = function(ev, paramName, paramInLocation) {

        // var useFullScreen = ($mdMedia("sm") || $mdMedia("xs")) && $scope.customFullscreen;
        var originalParam = this.operationObj.getParameter(paramName, paramInLocation),
            tempParam = angular.copy(originalParam),

            dialogeContext = {
                controller,
                controllerAs: "paramModalControl",
                locals: {tempParam},
                bindToController: true,
                template,
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true // useFullScreen
            };

        $mdDialog
            .show(dialogeContext)
            .then(updateParamFromModal.call(this, originalParam), cancelled);

        // $scope.$watch(function() {
        //     return $mdMedia("xs") || $mdMedia("sm");
        // }, function(wantsFullScreen) {
        //     $scope.customFullscreen = (wantsFullScreen === true);
        // });
    };

    /**
     */
    function updateParamFromModal(originalParameter) {

        return function updateFromReturn(response) {
            if (response !== "deleteParameter") {
                this.operationObj.updateParameter(originalParameter, response);
            } else {
                this.operationObj.removeParameter(originalParameter.name, originalParameter.inLocation);
            }
        }.bind(this);
    }

    /**
     */
    function cancelled() {
        // $log.log("You cancelled the dialog. RETURNING DIALOGE -- CANCELLED");
        // console.log("closed Parameditor");
    }


    /**
      * @name resetNewParamData
      * @desc a helper function to reset the data of the intputs
      * @type {Function}
     **/
    function resetNewParamData() {
        // debugger;
        return {
            name: null,
            inLocation: null,
            type: null
        };
    }

}
