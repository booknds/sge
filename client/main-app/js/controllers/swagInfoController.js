swaggerGE.controller("BaseSwaggerInfo", ['$scope', '$log', 'swaggerBaseInfo', function($scope, $log, swaggerBase){
    
    //display functionality
    $scope.showInfo = false;
    $scope.showContact = false;
    $scope.showLicense = false;
    
    $scope.editorEnabled = "";
    
    $scope.toggleInfo = function(){
        $scope.showInfo = !$scope.showInfo;
    };
    
    $scope.toggleContact = function(){
        $scope.showContact = !$scope.showContact;   
    };
    
    //used to test the base info singleton
    $scope.service = swaggerBase.getSwaggerInfo();
    
    //get the basic info.
    $scope.basicInfo = swaggerBase.newBaseInfo();
    
    //watch for changes in the basic info and update the service
    $scope.$watch('basicInfo',function(){
        //swaggerBase.baseInfo = $scope.basicInfo;
        swaggerBase.setSwaggerInfo($scope.basicInfo);
        //console.log(swaggerBase.getSwaggerInfo());
        //$scope.service = swaggerBase.getSwaggerInfo();
    }, true); // allow for a deep search of the object
    
    
    
    //$scope.testTitle = "title";
    
    $scope.disableEditors= function(){
        $scope.editorEnabled = "";
    };
    
    $scope.enableEditor= function(property){
        $scope.editorEnabled = property;
        //console.log($scope.editorEnabled);
    };
    
}]);