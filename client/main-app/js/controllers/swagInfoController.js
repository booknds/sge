swaggerGE.controller("BaseSwaggerInfo", ['$scope', '$log', 'swaggerBaseInfo', function($scope, $log, swaggerBase){
    
    //display functionality
    $scope.showInfo = false;
    $scope.showContact = false;
    $scope.showLicense = false;
    $scope.preventUpdate = true;
    $scope.toastMessage = "";
    
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
    
    //watch for baseinfo version and title
    $scope.$watch('basicInfo.info.title', function(){
        $scope.checkMinRequirements();
        console.log($scope.basicInfo.info.title)
    }, false);
    $scope.$watch('basicInfo.info.version', function(){
        $scope.checkMinRequirements();
    }, false);
    
    $scope.checkMinRequirements = function(){
        if(!$scope.basicInfo.info.title && !$scope.basicInfo.info.version){
            $scope.preventUpdate = true;
            $scope.toastMessage = "Please fill out Title and Version";
        }else if(!$scope.basicInfo.info.title){
            $scope.preventUpdate = true;
            $scope.toastMessage = "Please fill out Title";
        }else if(!$scope.basicInfo.info.version){
            $scope.preventUpdate = true;
            $scope.toastMessage = "Please fill out Version";
        }else{
            $scope.preventUpdate = false;
            $scope.toastMessage = "";
        }
    }
    
    //$scope.testTitle = "title";
    
    $scope.disableEditors= function(){
        $scope.editorEnabled = "";
    };
    
    $scope.enableEditor= function(property){
        $scope.editorEnabled = property;
        //console.log($scope.editorEnabled);
    };
    
}]);