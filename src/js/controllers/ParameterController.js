swaggerGE.controller("paramController", ['$scope', '$log', 'swaggerPathsService', function(scope, log, swaggerPaths){
    "use strict";
    
    scope.currentParameterPath = swaggerPaths.chosenParameter;
    
    scope.currentParam;
    
    $scope.$watch("currentParam", function(oldVal, newVal){
        
        log.log(oldVal + ", " + newVal);
    });
    
    
    
}]);