import template from "../../../components/modals/saveFile/saveFile.html";
import controller from "../../../components/modals/saveFile/saveFile.controller.js";

let sideNavArray = ["$scope", "$element", "$timeout", "CompilerService", "$mdDialog", "$document", SidenavCtrl];

export default sideNavArray;

/**
 */
function SidenavCtrl($scope, $element, $timeout, cs, $mdDialog, $document) {

    this.sideNavContent = {
        open: [
            {
                title: "From Local",
                function: this.openFile
            },
            {
                title: "From SwaggerHub",
                function: this.openFile
            }
        ],
        save: [
            {
                title: "To Local",
                function: this.download
            },
            {
                title: "To SwaggerHub",
                function: this.download
            }
        ]
    };

    this.compiledDocument = cs.compiled;

    // this.pickedFile = "";

    this.openFile = function openFile() {
        // debugger;
        let opener = $element.find("#file-input");

        $timeout(function() {
            opener.click();
        });

    };

    this.onChange = function onChangeHandler(event) {
        // return if the even is unidentified or null
        if (!event) {
            return;
        }

        // debugger;
        let file = event.target.files[0];
        let reader = new FileReader();

        // set up the onload property to fire when readAsText() below is compeleted;
        // reader.onload = function __onload_handler__(event){ original handler can take an event
        reader.onload = function onLoadHandler() {
        // debugger;

            $scope.$apply(function applyHndler() {

                let fileContent = angular.copy(reader.result);
                fileContent = angular.fromJson(fileContent);

                cs.distributeImportedDefinitionToServices(fileContent);

            }.bind(this));

        }.bind(this);

        // read in the file as a string -> sets of reader.onload() when complete.
        reader.readAsText(file);

    }.bind(this);


    this.recompile = function recompile() {
        cs.recompile();
    };

    // this.download = function download(text) {
    //     this.compiledDocument = cs.compiled;
    //     this.recompile();
    //     text = cs.compiled;
    //
    //     if (Object.keys(text).length === 0) {
    //         // UtilitiesService.toast("Definition Cannot be empty", 3000);
    //         return;
    //     }
    //
    //     var data = new Blob([angular.toJson(text, true)], { type: "application/json" });
    //     FileSaver.saveAs(data, "swagger.json");
    // };
    this.download = function(ev) {

        var dialogeContext = {
            controller,
            controllerAs: "$ctrl",
            locals: {},
            bindToController: true,
            template,
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // useFullScreen
        };

        $mdDialog
            .show(dialogeContext)
            .then(function() {
            }, function() {
            });

        // $scope.$watch(function() {
        //     return $mdMedia("xs") || $mdMedia("sm");
        // }, function(wantsFullScreen) {
        //     $scope.customFullscreen = (wantsFullScreen === true);
        // });
    };
}
