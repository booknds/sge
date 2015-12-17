swaggerGE.controller("DefinitionsController", ["$scope", "DefinitionsService",
  function($scope, ds){

    var vm = this;

    vm.definitons = ds.definitions;

    $scope.$watch(function(){return ds.definitions;}, function(newVal){
      console.log("DEFINITIONS HIT");
      if(newVal){
        console.log(newVal);
        console.log("DEFINITIONS CHANGED");
        vm.definitons = ds.definitions;
      }
    }, true);

    

}])
