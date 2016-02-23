
let sideNavArray = ["$scope", "$log", "$element", "$timeout", "CompilerService", "FileSaver", "Blob", SidenavCtrl];

export default sideNavArray;

/**
 */
function SidenavCtrl($scope, $log, $element, $timeout, cs, FileSaver, Blob) {

    this.content = {
        open: [
            {
                title: "From Local",
                op: openFile
            }
            // {
            //     title: "From SwaggerHub",
            //     op: null
            // }
        ],
        save: [
            {
                title: "To Local",
                op: download
            }
            // {
            //     title: "To SwaggerHub",
            //     op: null
            // }
        ]
    };

    this.show = {
        open: false,
        save: false
    };

    this.toggleDropdown = function toggleDropdown(key) {
        // debugger;
        this.show[key] = !this.show[key];
    };

    this.isOpenLocal = function isOpenLocal(key, title) {
        return (key === "open" && title === "From Local");
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

    /**
    */
    function download(text) {
        cs.recompile();
        text = cs.compiled;

        $log.log(text);

        if (Object.keys(text).length === 0) {
            // UtilitiesService.toast("Definition Cannot be empty", 3000);
            return;
        }

        var data = new Blob([angular.toJson(text, true)], { type: "application/json" });
        FileSaver.saveAs(data, "swagger.json");
    }

    /**
     */
    function openFile() {
        // debugger;
        let opener = $element.find("#file-input");

        $timeout(function() {
            opener.click();
        });

    }

}
