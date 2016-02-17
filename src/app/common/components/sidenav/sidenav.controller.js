import angular from "angular";
"use strict";

let sideNavArray = ["$scope", "$log", "$element", "$timeout", "UtilitiesService", "CompilerService", "FileSaver", "Blob", SidenavCtrl];

export default sideNavArray;

function SidenavCtrl($scope, $log, $element, $timeout, UtilitiesService, cs, FileSaver, Blob){

    this.compiledDocument = cs.compiled;

    this.pickedFile = "";

    this.openFile = function openFile(){
        // debugger;
        let opener = $element.find("#file-input");

        $timeout(function() {
            opener.click();
        });
        
    };

    this.onChange = function onChange_handler(event) {
        //return if the even is unidentified or null
        if (!event) {
            return;
        }

        //debugger;
        let file = event.target.files[0];
        let reader = new FileReader();

        //set up the onload property to fire when readAsText() below is compeleted;
        //reader.onload = function __onload_handler__(event){ original handler can take an event
        reader.onload = function __onload_handler__(){
        //debugger;

            $scope.$apply(function __apply_handler__(){
                //use $apply() to fire manual watchers to this.pickedFile
                // debugger;
                let file_content = angular.copy(reader.result);
                // this.pickedFile = angular.fromJSON(file_content);
                // this.pickedFile = JSON.parse(file_content);
                let parsed_file_content = angular.fromJson(file_content);
                //let parsed_file_content = JSON.parse(file_content);

                cs.distributeImportedDefinitionToServices(parsed_file_content);

            }.bind(this));

        }.bind(this);

        //read in the file as a string -> sets of reader.onload() when complete.
        reader.readAsText(file);

    }.bind(this);


    this.recompile = function recompile(){
        cs.recompile();
    };

    this.download = function download(text){
        this.compiledDocument = cs.compiled;
        this.recompile();
        text = cs.compiled;

        $log.log(text);

        if(Object.keys(text).length === 0){
            UtilitiesService.toast("Definition Cannot be empty", 3000);
            return;
        }

        var data = new Blob([angular.toJson(text, true)], { type: "application/json" });
        FileSaver.saveAs(data, "swagger.json");
    };

}
