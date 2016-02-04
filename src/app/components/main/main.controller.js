// import angularFileSaver from "angular-file-saver";
import angular from "angular";

"use strict";

//  angular
//    .module("SwaggerGraphicalEditor")
//    .controller("CompilerController", ["$scope", "CompilerService", "FileSaver", "Blob", CompilerCtrl]);
let compilerArray = ["$scope", "$log", "CompilerService", "FileSaver", "Blob", CompilerCtrl];

export default compilerArray;

function CompilerCtrl($scope, $log, cs, FileSaver, Blob){
    var vm =  this;

    vm.compiledDocument = cs.compiled;


    /*
    *
    *
    */
    vm.recompile = function(){
        cs.recompile();
    };

    vm.download = function(text){
        var data = new Blob([angular.toJson(text)], { type: "application/json" });
        FileSaver.saveAs(data, "swagger.json");
    };

    $scope.$watch(function(){return cs.compiled;}, function(newVal){
        $log.log("COMPILKED CHANGED");
        $log.log(newVal);
        if (newVal) {
            vm.compiledDocument = cs.compiled;
            //vm.definitions = ds.definitions;
        }
    }, true);

}
