swaggerGE.controller("BaseSwaggerInfo", ['$scope', '$log', 'swaggerBaseInfo', function($scope, $log, swaggerBase){
    
    //display functionality
    $scope.showInfo = false;
    $scope.showContact = false;
    $scope.showLicense = false;
    
    $scope.toggleInfo = function(){
        $scope.showInfo = !$scope.showInfo;
    };
    
    $scope.toggleContact = function(){
        $scope.showContact = !$scope.showContact;   
    };
    
    //get the basic info.
    $scope.basicInfo = swaggerBase.newBaseInfo();
    
    $scope.editorEnabled = "";
    
    $scope.testTitle = "title";
    
    $scope.disableEditors= function(){
        $scope.editorEnabled = "";
    };
    
    $scope.enableEditor= function(property){
        $scope.editorEnabled = property;
        //console.log($scope.editorEnabled);
    };
    
    
    //The basic information for a swagger definition
    var swaggerSkeleton = function(swaggerInfo){
       return { 
           swagger: "",
            info: {
                title: "",
                description: "",
                termsOfService: "",
                contact: {
                    name: "",
                    url: "",
                    email: "",
                },
                license: {
                    name: "",
                    url: ""
                },
                version: "",
            },
           host: "",
           basePath: "",
           schemes: "",
           consumes: "",
           produces: "",
           paths: {},
           definitions: {},
           parameters: {},
           responses: {},
           securityDefinitions: {},
           security: {},
           tags: {},
           externalDocs: {},
        }
    }
    
    var basicInfo1 = swaggerBase.newBaseInfo();
    var basicInfo2 = swaggerBase.newBaseInfo();
    
    basicInfo2.info.title = "suck it!";
    
    console.log(basicInfo1);
    console.log(basicInfo2);
}]);