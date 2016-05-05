import template from "../modals/pathCreator/pathCreator.html";
import controller from "../modals/pathCreator/pathCreator.controller";

let PathController = ["$log", "$document", "UtilitiesService", "PathService", "$window", "$mdDialog", PathCtrl];

export default PathController;

/**
 */
function PathCtrl($log, $document, UtilitiesService, PathService, $window, $mdDialog) {

    // used to test the services
    this.paths = PathService.paths;

    this.operations = ["post", "get", "put", "delete"];

    this.dontShowPaths = {};

    this.prevent = {};

    this.toggleShowPath = function toggle(pathName) {
        if (angular.isUndefined(pathName)) {
            this.dontShowPaths[pathName] = true;

        } else {
            this.dontShowPaths[pathName] = !this.dontShowPaths[pathName];
        }
    };

    this.toggleShowPathInfo = function toggle(pathName, operation) {
        if (angular.isUndefined(operation)) {
            this.prevent[pathName][operation] = true;

        } else {
            this.prevent[pathName][operation] = !this.prevent[pathName][operation];
        }
    };

    this.showPathCreator = function(ev) {
        // debugger;
        // var useFullScreen = ($mdMedia("sm") || $mdMedia("xs")) && this.customFullscreen;
        $mdDialog.show({
            // controller: DialogController,
            // templateUrl: "dialog1.tmpl.html",
            controller,
            controllerAs: "pathModal",
            template,
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // useFullScreen
        })
        .then(function(answer) {
            // debugger;
            // $scope.status = "You said the information was '" + answer + "'.";
            $log.log("RETURNING DIALOGE" + answer);
            this.prevent[answer] = {
                get: true,
                post: true,
                put: true,
                delete: true
            };
        }.bind(this), function() {
            // $scope.status = "You cancelled the dialog.";
            $log.log("RETURNING DIALOGE -- CANCELLED");
        });

        // $scope.$watch(function() {
        //     return $mdMedia("xs") || $mdMedia("sm");
        // }, function(wantsFullScreen) {
        //     $scope.customFullscreen = (wantsFullScreen === true);
        // });
    }.bind(this);

    this.updatePathName = function(originalPathName, newPathName) {
        if (angular.isUndefined(newPathName)) {
            UtilitiesService.toast("New Name cannot be blank", 3000);
            return;
        }

        debugger;
        try {
            PathService.updatePathName(originalPathName, newPathName);
            // delete the old pathName saved on the Object
            delete this[originalPathName];
            // $scope.updateName.$setPristine();
        } catch (e) {
            $log.log(e);
            UtilitiesService.toast(e, 3000);
        }

    };

    this.deletePath = function(pathName) {
        if ($window.confirm("Are you sure you want to delete the path?")) {

            try {
                PathService.removePath(pathName);

            } catch (e) {
                $log.log(e);
                UtilitiesService.toast(e, 3000);
            }
            //  PathService.deleteOperation(pathName, operation);

            // delete path.pathDefinition[pathName][operation];

        } else {
            // angular
            $log.log("DONT DELETE");
            // path.currentPathOperations[operation] = !path.currentPathOperations[operation];

        }
    };

    this.deleteOperation = function(pathName, operation) {
        // if the operation exists delete it

        if ($window.confirm("Are you sure you want to delete the " + operation + " operation?")) {

            PathService.removeOperation(pathName, operation);

          // delete path.pathDefinition[pathName][operation];

        } else {
            $log.log("dont delete operation");
        }
    };

    this.addOperation = function(pathName, operation) {
        try {
            PathService.addOperation(pathName, operation);
        } catch (e) {
            $log.log(e);
            UtilitiesService.toast(e, 3000);
        }
    };

    this.updateOperation = function(pathName, operation, key, value) {
        PathService.updateOperationInformation(pathName, operation, key, value);
        value = "";
        UtilitiesService.toast("Updated " + key, 2000);
    };
}
