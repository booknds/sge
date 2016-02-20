import template from "../modals/parameterEditor/parameterEditor.html";
import controller from "../modals/parameterEditor/parameterEditor.controller";

let ParameterController = ["$mdDialog", "$document", "$mdMedia", "PathService", ParameterCtrl];

export default ParameterController;

/**
 */
function ParameterCtrl($mdDialog, $document, $mdMedia, PathService) {

    this.inLocationList = ["path", "query", "header", "body", "formData"];

    this.pLength = null;

    this.addParam = function(paramName, paramInLocation) {

        PathService.addNewParam(this.sgContext, paramName, paramInLocation);

        // reset input data
        // $scope.addParameter.$setPristine();
        resetNewParamData.call(this, this.sgThisOperation);

        this.pLength = this.sgContext.parameters.length;
    };

    this.showParamEditor = function(ev, paramName, paramInLocation) {

        // var useFullScreen = ($mdMedia("sm") || $mdMedia("xs")) && $scope.customFullscreen;
        var originalParam = this.sgContext.getParameter(paramName, paramInLocation),
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
            debugger;
            if (response !== "delete") {
                this.sgContext.updateParameter(originalParameter, response);
            } else {
                this.sgContext.removeParameter(originalParameter.name, originalParameter.inLocation);
            }
            // $log.log("RETURNING DIALOGE accept", newParameter);

            // try {
            //     debugger;
            //     this.sgContext.updateParameter(originalParameter, newParameter);

            // } catch (e) {
            //     $log.log(e);
            //     UtilitiesService.toast("Parameter name/query combo' already exists", 3000);
            // }
        }.bind(this);
    }

    /**
     */
    function cancelled() {
        // $log.log("You cancelled the dialog. RETURNING DIALOGE -- CANCELLED");
        console.log("closed Parameditor");
    }

    // this.editParamData = function(pathName, operation, paramName, paramInLocation){
    //
    //     var param = this.sgContext.getParameter(paramName, paramInLocation);
    //
    //     //debugger;
    //     //pms.initParameter(this.sgContext, paramName, paramInLocation);
    //
    //     pms.initParameter(this.sgContext, param);
    //
    //     //pms.parameterToUpdate(pathName, operation, param);
    //
    // };

    /**
      * @name resetNewParamData
      * @desc a helper function to reset the data of the intputs
      * @type {Function}
     **/
    function resetNewParamData(operation) {
        // debugger;
        this.newParamData[operation] = {
            name: null,
            inLocation: null
        };
    }

    // this.reduce = function(obj){
    //     let cleaned = {};

    //     for (var key in obj) {
    //         if (obj[key] !== null || angular.isDefined(obj[key])) {
    //             cleaned[key] = obj[key];
    //         }
    //     }

    //     return cleaned;
    // };

    // this.reduce = function reduce(obj, reduceBy) {
    //     let reduced = {};

    //     for (var key in obj) {

    //     }

    //     return reduced;
    // };

}
