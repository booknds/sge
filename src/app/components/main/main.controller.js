import angular from 'angular';
import angularFileSaver from 'angular-file-saver';

"use strict";

//  angular
//    .module("SwaggerGraphicalEditor")
//    .controller("CompilerController", ["$scope", "CompilerService", 'FileSaver', 'Blob', CompilerCtrl]);
let compilerArray = ["$scope", '$element', '$attrs', "CompilerService", 'FileSaver', 'Blob', CompilerCtrl]

export default compilerArray;

function CompilerCtrl($scope, $element, $attrs, cs, FileSaver, Blob){
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
    var data = new Blob([JSON.stringify(text)], { type: 'application/json' });
    FileSaver.saveAs(data, 'swagger.json');
  }

  $scope.$watch(function(){return cs.compiled;}, function(newVal){
    console.log("COMPILKED CHANGED");
    console.log(newVal)
    if(newVal){
      vm.compiledDocument = cs.compiled;
      //vm.definitions = ds.definitions;
    }
  }, true);

}
