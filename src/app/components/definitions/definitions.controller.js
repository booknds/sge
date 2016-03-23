import creatorTemplate from "../modals/definitionCreator/definitionCreator.html";
import creatorController from "../modals/definitionCreator/definitionCreator.controller";
import editorTemplate from "../modals/definitionEditor/definitionEditor.html";
import editorController from "../modals/definitionEditor/definitionEditor.controller";

let definitionsController = ["$document", "$window", "DefinitionsService", "$mdDialog", DefinitionsCtrl];

export default definitionsController;

/**
 */
function DefinitionsCtrl($document, $window, ds, $mdDialog) {

    this.definitions = ds.getDefinitions();
    this.headers = ["Name", "Description", "Type", "Required", "Enum"];
    this.Types = ["int32", "int64", "float", "double", "string", "byte", "binary", "boolean", "date", "date-time", "password"];

    this.showDefinitionCreator = function(ev) {
        // debugger;
        // var useFullScreen = ($mdMedia("sm") || $mdMedia("xs")) && $scope.customFullscreen;
        $mdDialog.show({
            // controller: DialogController,
            // templateUrl: "dialog1.tmpl.html",
            controller: creatorController,
            controllerAs: "definitionCreation",
            template: creatorTemplate,
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        })
        .then(function(answer) {
            // $scope.status = "You said the information was '" + answer + "'.";
            // $log.log("RETURNING DIALOGE" + answer);\
            console.warn(answer);
        }, function() {
            // $scope.status = "You cancelled the dialog.";
            // $log.log("RETURNING DIALOGE -- CANCELLED");
        });

        // $scope.$watch(function() {
        //     return $mdMedia("xs") || $mdMedia("sm");
        // }, function(wantsFullScreen) {
        //     $scope.customFullscreen = (wantsFullScreen === true);
        // });
    };

    this.showDefinitionEditor = function(ev, definitionName, definitionValue) {

        // var useFullScreen = ($mdMedia("sm") || $mdMedia("xs")) && $scope.customFullscreen,
        // debugger;
        var originalDefinition = {
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
                fullscreen: true // useFullScreen
            };

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
            // $log.log("RETURNING DIALOGE accept", newDefinition);
            ds.updateDefinition(originalDefinition, newDefinition);

        };
    }

    /**
     */
    function cancelled() {
        // $log.log("You cancelled the dialog. RETURNING DIALOGE -- CANCELLED");
    }

    this.deleteDefinition = function(definitionName) {
        if ($window.confirm("Are you sure you want to delete the definition?")) {
            ds.deleteDefinition(definitionName);
        } else {
            // $log.log("Don't delete definitions");
        }
    };

}
