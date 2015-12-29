swaggerGE.controller("CompilerController", ["$scope", "CompilerService", 'FileSaver', 'Blob',
  function($scope, cs, FileSaver, Blob){
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

  }])
