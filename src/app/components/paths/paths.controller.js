import angular from "angular";
import template from "../modals/pathCreator/pathCreator.html";
import controller from "../modals/pathCreator/pathCreator.controller";

"use strict";

let PathController = ["$scope", "$log", "$document", "UtilitiesService", "PathService", "$window", "$mdDialog", "$mdMedia", PathCtrl];

export default PathController;

function PathCtrl($scope, $log, $document, UtilitiesService, swaggerPaths, $window, $mdDialog, $mdMedia){
    //$scope.thisObject = this;

    //used to test the services
    this.paths = swaggerPaths.paths;

    // this.prevent = {
    //     showPaths:false
    // };

    this.operations = ["get", "post", "put", "delete"];

    // this.hasOperation = function(pathName, operation){
    //     debugger;
    //     return this.paths[pathName].hasOwnProperty(operation);
    // };

    // $scope.focusPathModal = false;

    // $scope.openFocusPathModal = function(){
    //     $scope.focusPathModal = true;
    //     $log.log("toggle focus: focusPathModal ==" + $scope.focusPathModal);
    //     //$scope.focusPathModal = !$scope.focusPathModal;
    // };

    // function toast(message){
    //     UtilitiesService.toast(message, 3000);
    // }

    this.showPathCreator = function(ev) {
        //debugger;
        var useFullScreen = ($mdMedia("sm") || $mdMedia("xs"))  && $scope.customFullscreen;
        $mdDialog.show({
            // controller: DialogController,
            // templateUrl: "dialog1.tmpl.html",
            controller,
            controllerAs: "pathModal",
            template,
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        })
        .then(function(answer) {
            //debugger;
            $scope.status = "You said the information was '" + answer + "'.";
            $log.log("RETURNING DIALOGE" + $scope.status);
        }, function() {
            $scope.status = "You cancelled the dialog.";
            $log.log("RETURNING DIALOGE -- CANCELLED");
        });

        // $scope.$watch(function() {
        //     return $mdMedia("xs") || $mdMedia("sm");
        // }, function(wantsFullScreen) {
        //     $scope.customFullscreen = (wantsFullScreen === true);
        // });
    };

    this.updatePathName = function(originalPathName, newPathName){
        try {
            swaggerPaths.updatePathName(originalPathName, newPathName);
            //delete the old pathName saved on the Object
            //delete this[originalPathName];
            this[newPathName]="";
        } catch (e) {
            $log.log(e);
            UtilitiesService.toast(e, 3000);
        }
    };

    this.deletePath = function(pathName){
        if ($window.confirm("Are you sure you want to delete the path?")) {

            try{
                swaggerPaths.removePath(pathName);
            } catch (e) {
                $log.log(e);
                UtilitiesService.toast(e, 3000);
            }
            //  swaggerPaths.deleteOperation(pathName, operation);

            //delete path.pathDefinition[pathName][operation];

        } else {
            //angular
            $log.log("DONT DELETE");
            //path.currentPathOperations[operation] = !path.currentPathOperations[operation];

        }
    };

/**---------  START Operation methods ---------**/

    this.deleteOperation = function(pathName, operation){
        //if the operation exists delete it

        if ($window.confirm("Are you sure you want to delete the " + operation + " operation?")) {

            swaggerPaths.removeOperation(pathName, operation);

          //delete path.pathDefinition[pathName][operation];

        } else {
            $log.log("dont delete operation");
        }
    };    

    this.addOperation = function(pathName, operation){
        try {
            swaggerPaths.addOperation(pathName, operation);
        } catch (e) {
            $log.log(e);
            UtilitiesService.toast(e, 3000);
        }
    };

    this.updateOperation = function(pathName, operation, key, value){
        swaggerPaths.updateOperationInformation(pathName, operation, key, value);
        value="";
        UtilitiesService.toast("Updated " + key, 2000);
    };
}
