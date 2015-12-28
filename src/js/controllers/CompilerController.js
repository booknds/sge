swaggerGE.controller("CompilerController", ["$scope", "CompilerService",
  function($scope, cs){
    var vm =  this;

    vm.compiledDocument = cs.compiled;

    vm.recompile = function(){
      cs.recompile();
    };

    $scope.$watch(function(){return cs.compiled;}, function(newVal){
      console.log("COMPILKED CHANGED");
      console.log(newVal)
      if(newVal){
        vm.compiledDocument = cs.compiled;
        //vm.definitions = ds.definitions;
      }
    }, true);

  }])
