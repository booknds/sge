import angular from "angular";
import template from "../modals/definitionCreator/definitionCreator.html";
import controller from "../modals/definitionCreator/definitionCreator.controller";

"use strict";

let definitionsController = ["$scope", "$window", "$document", "$log", "UtilitiesService", "DefinitionsService", "DefinitionEditorModalService", "$mdDialog", "$mdMedia", DefinitionsCtrl];

export default definitionsController;

function DefinitionsCtrl($scope, $window, $document, $log, UtilitiesService, ds, dems, $mdDialog, $mdMedia){

    var vm = this;

    // debugger;

    vm.definitions = ds.definitions;
    vm.headers = ["Name", "Description", "Type", "Required", "Enum"];
    vm.Types = ["int32","int64", "float", "double", "string", "byte", "binary", "boolean", "date", "date-time", "password"];

    $scope.focusDefinitionModal = false;
    $scope.customFullscreen = $mdMedia("xs") || $mdMedia("sm");

    // function toast(message){
    //     Materialize.toast(message, 3000);
    // }

    $scope.openFocusDefinitionModal = function(){
        $scope.focusDefinitionModal = true;
        $log.log("toggle focus: focusPathModal ==" + $scope.focusDefinitionModal);
        //$scope.focusPathModal = !$scope.focusPathModal;
    };

    $scope.showAdvanced = function(ev) {
        //debugger;
        var useFullScreen = ($mdMedia("sm") || $mdMedia("xs"))  && $scope.customFullscreen;
        $mdDialog.show({
            // controller: DialogController,
            // templateUrl: "dialog1.tmpl.html",
            controller,
            controllerAs: "definitionCreation",
            template,
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        })
        .then(function(answer) {
            //debugger;
            //$scope.status = "You said the information was '" + answer + "'.";
            $log.log("RETURNING DIALOGE" + answer);
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

    vm.initDefinitionEditorModal = function(definitionName, definitionValue){
        $log.log("initDefinitionEditorModal");
        try {
            //var currentResponse = PathService.getResponse(pathName, operation, httpCode);
            $log.log(definitionName);
            $log.log(definitionValue);
            dems.definitionToUpdate(definitionName, definitionValue);
        } catch (e) {
            $log.log(e);
            UtilitiesService.toast(e, 3000);
            return;
        }
    };

    vm.deleteDefinition = function(definitionName){
        if ($window.confirm("Are you sure you want to delete the definition?")) {
            ds.deleteDefinition(definitionName);
        } else {
            $log.log("Don't delete definitions");
        }
    };

}
