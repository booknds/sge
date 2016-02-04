"use strict";

let ResponseController = ["$scope", "$log", "UtilitiesService", "PathService", "ResponseModalService", ResponseCtrl];

export default ResponseController;

function ResponseCtrl($scope, $log, UtilitiesService, PathService, rms){
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


  /**
    * @name initResponseModal
    * @desc Sends the chosen response code and "responses" object to the
    *        ResponseModalService to be processed.
    * @type {Function}
   **/
    this.initResponseModal = function(httpCode){
        try {
            rms.responseToUpdate(httpCode, this.sgContext);
        } catch (e) {
            $log.log(e);
            UtilitiesService.toast(e, 3000);
            return;
        }
    };

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
