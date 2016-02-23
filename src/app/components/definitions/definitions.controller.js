import creatorTemplate from "../modals/definitionCreator/definitionCreator.html";
import creatorController from "../modals/definitionCreator/definitionCreator.controller";
import editorTemplate from "../modals/definitionEditor/definitionEditor.html";
import editorController from "../modals/definitionEditor/definitionEditor.controller";

let definitionsController = ["$scope", "$window", "$document", "$log", "UtilitiesService", "DefinitionsService", "$mdDialog", "$mdMedia", DefinitionsCtrl];

export default definitionsController;

/**
 */
function DefinitionsCtrl($scope, $window, $document, $log, UtilitiesService, ds, $mdDialog, $mdMedia) {

    this.definitions = ds.definitions;
    this.headers = ["Name", "Description", "Type", "Required", "Enum"];
    this.Types = ["int32", "int64", "float", "double", "string", "byte", "binary", "boolean", "date", "date-time", "password"];

    $scope.focusDefinitionModal = false;
    $scope.customFullscreen = $mdMedia("xs") || $mdMedia("sm");

    this.showDefinitionCreator = function(ev) {
        // debugger;
        var useFullScreen = ($mdMedia("sm") || $mdMedia("xs")) && $scope.customFullscreen;
        $mdDialog.show({
            // controller: DialogController,
            // templateUrl: "dialog1.tmpl.html",
            controller: creatorController,
            controllerAs: "definitionCreation",
            template: creatorTemplate,
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
        .then(function(answer) {
            // debugger;
            // $scope.status = "You said the information was '" + answer + "'.";
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

    this.showDefinitionEditor = function(ev, definitionName, definitionValue) {

        var useFullScreen = ($mdMedia("sm") || $mdMedia("xs")) && $scope.customFullscreen,
        // var originalParam = this.sgContext.getParameter(paramName, paramInLocation);
        // var tempParam = angular.copy(originalParam);
            originalDefinition = {
                name: definitionName,
                value: definitionValue
            },
            tempDefinition = angular.copy(originalDefinition),
            dialogeContext = {
                controller: editorController,
                controllerAs: "definitionEditor",
                locals: {
                    tempDefinition
                },
                bindToController: true,
                template: editorTemplate,
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            };

        debugger;
        $mdDialog
            .show(dialogeContext)
            .then(updateDefinitionFromModal(originalDefinition), cancelled);

        // $scope.$watch(function() {
        //     return $mdMedia("xs") || $mdMedia("sm");
        // }, function(wantsFullScreen) {
        //     $scope.customFullscreen = (wantsFullScreen === true);
        // });
    };

    /**
     */
    function updateDefinitionFromModal(originalDefinition) {

        return function updateFromReturn(newDefinition) {
            $log.log("RETURNING DIALOGE accept", newDefinition);

            try {
                debugger;
                ds.updateDefinition(originalDefinition, newDefinition);

            } catch (e) {
                $log.log(e);
                UtilitiesService.toast("Parameter name/query combo' already exists", 3000);
            }
        };
    }

    /**
     */
    function cancelled() {
        $log.log("You cancelled the dialog. RETURNING DIALOGE -- CANCELLED");
    }

    this.deleteDefinition = function(definitionName) {
        if ($window.confirm("Are you sure you want to delete the definition?")) {
            ds.deleteDefinition(definitionName);
        } else {
            $log.log("Don't delete definitions");
        }
    };

}
