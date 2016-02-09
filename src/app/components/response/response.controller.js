import angular from "angular";
import template from "../modals/responseEditor/responseEditor.html";
import controller from "../modals/responseEditor/responseEditor.controller";

"use strict";

let ResponseController = ["$scope", "$log", "$mdMedia", "$mdDialog", "$document", "UtilitiesService", "PathService", ResponseCtrl];

export default ResponseController;

function ResponseCtrl($scope, $log, $mdMedia, $mdDialog, $document, UtilitiesService, PathService){
  //debugger;
  /**
    * @name newResponseData
    * @desc Holds the state of the inputs. Only manipulated in the DOM
    * @type {Object}
   **/
  // this.newResponseData = {
  //
  // }
  // this.newResponseData[this.sgThisOperation] = {
  //   httpCode: null,
  //   description: null
  // }

    /**
      * @name rKeys
      * @desc Holds how many "keys" are on sgContext which is a passed value and
      *        is a reference to the "responses" object
      * @type {Object}
    **/
    this.rKeys = null;

    this.showResponseEditor = function(ev, httpCode) {

        var useFullScreen = ($mdMedia("sm") || $mdMedia("xs"))  && $scope.customFullscreen,

            originalResponseContext = {
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
                clickOutsideToClose:true,
                fullscreen: useFullScreen
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

    function updateResponseFromModal(originalResponse){

        return function updateResponse(newResponse){
            debugger;
            $log.log("RETURNING DIALOGE accept", newResponse);
            try {
                // swaggerPaths.updateParameter(originalParamData, paramModal.tempParam);
                PathService.updateResponse(originalResponse, newResponse);
            } catch(e) {
                $log.log(e);
                // Materialize.toast("Parameter name/query combo' already exists", 3000);
                UtilitiesService.toast(e);
            }
        }.bind(this);
    }

    function cancelled(){
        $log.log("You cancelled the dialog. RETURNING DIALOGE -- CANCELLED");
    }

  /**
    * @name initResponseModal
    * @desc Sends the chosen response code and "responses" object to the
    *        ResponseModalService to be processed.
    * @type {Function}
   **/
    // this.initResponseModal = function(httpCode){
    //     try {
    //         rms.responseToUpdate(httpCode, this.sgContext);
    //     } catch (e) {
    //         $log.log(e);
    //         UtilitiesService.toast(e, 3000);
    //         return;
    //     }
    // };

  /**
    * @name addResponse
    * @desc adds a new "response" object to the "responses" object. "responses"
    *        holds the state of all current response objects.
    * @type {Function}
   **/
    this.addResponse = function(httpCode, description){
        try{
            this.sgContext.addResponse(httpCode, description);
        } catch (e) {
            $log.log(e);
            UtilitiesService.toast(e, 3000);
        }

        //reset input fields
        $scope.addResponse.$setPristine();
        //debugger;
        resetNewResponseData.call(this, this.sgThisOperation);

        this.rKeys= Object.keys(this.sgContext).length;

    };

  /**
    * @name resetNewResponseData
    * @desc a helper function to reset the data of the intputs
    * @type {Function}
   **/
    function resetNewResponseData(operation){
        this.newResponseData[operation] = {
            httpCode: null,
            description: null
        };
    }

}
