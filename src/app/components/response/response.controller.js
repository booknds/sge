import angular from "angular";
import template from "../modals/responseEditor/responseEditor.html";
import controller from "../modals/responseEditor/responseEditor.controller";

let ResponseController = ["$log", "$mdDialog", "$document", "UtilitiesService", "PathService", ResponseCtrl];

export default ResponseController;

/**
 */
function ResponseCtrl($log, $mdDialog, $document, UtilitiesService, PathService) {

    /**
      * @name rKeys
      * @desc Holds how many "keys" are on sgContext which is a passed value and
      *        is a reference to the "responses" object
      * @type {Object}
    **/
    this.rKeys = null;

    this.showResponseEditor = function(ev, httpCode) {

        // var useFullScreen = ($mdMedia("sm") || $mdMedia("xs")) && $scope.customFullscreen,

        var originalResponseContext = {
                httpCode,
                responses: this.sgContext
            },

            tempResponse = {
                httpCode,
                response: angular.copy(this.sgContext.getResponse(httpCode))
            },

            dialogeContext = {
                controller,
                controllerAs: "rmControl",
                locals: { tempResponse },
                bindToController: true,
                template,
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true // useFullScreen
            };

        $mdDialog
            .show(dialogeContext)
            .then(updateResponseFromModal.call(this, originalResponseContext), cancelled);

        // $scope.$watch(function() {
        //     return $mdMedia("xs") || $mdMedia("sm");
        // }, function(wantsFullScreen) {
        //     $scope.customFullscreen = (wantsFullScreen === true);
        // });
    };

  /**
    * @name addResponse
    * @desc adds a new "response" object to the "responses" object. "responses"
    *        holds the state of all current response objects.
    * @type {Function}
   **/
    this.addResponse = function(httpCode, description) {
        try {
            this.sgContext.addResponse(httpCode, description);
        } catch (e) {
            $log.log(e);
            UtilitiesService.toast(e, 3000);
        }

        // reset input fields
        // $scope.addResponse.$setPristine();
        // debugger;
        resetNewResponseData.call(this, this.sgThisOperation);

        this.rKeys = Object.keys(this.sgContext).length;

    };

    /**
     */
    function updateResponseFromModal(originalResponse) {

        return function updateResponse(response) {
            debugger;
            if (response !== "delete") {
                try {
                    // swaggerPaths.updateParameter(originalParamData, paramModal.tempParam);
                    PathService.updateResponse(originalResponse, response);
                } catch (e) {
                    $log.log(e);
                    // Materialize.toast("Parameter name/query combo' already exists", 3000);
                    UtilitiesService.toast(e);
                }
            } else {
                debugger;
                let httpCode = originalResponse.httpCode;
                originalResponse.responses.removeResponse(httpCode);
            }
        }.bind(this);
    }

    /**
     */
    function cancelled() {
        $log.log("You cancelled the dialog. RETURNING DIALOGE -- CANCELLED");
    }

  /**
    * @name resetNewResponseData
    * @desc a helper function to reset the data of the intputs
    * @type {Function}
   **/
    function resetNewResponseData(operation) {
        this.newResponseData[operation] = {
            httpCode: null,
            description: null
        };
    }

}
