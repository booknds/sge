swaggerGE.controller("swaggerPaths", ['$scope', '$log', 'swaggerBaseInfo', function($scope, $log, swaggerBase){
    
    var Path = function (){
        
        return {
            currentName:"pathName",
            newName:"",
            pathDefinition: {
                pathName: {
                    tags: "",
                    summary: "",
                    description:"",
                    externalDocs: {
                        description: "",
                        url:""
                    },
                    operationId:"",
                    produces:"",
                    consumes:"",
                    parameters: {
                    },
                    responses: {
                    },
                    schemes: "",
                    deprecated: false,
                    security: {
                   }
                }
            } 
        }
    }
    
    $scope.paths=[];
    
    
    $scope.$watch("paths", function() {
        
    }, true);
    
    /*
        Used to update the path name in the path definition since the path name is the key
        of the path object
    */
    $scope.updatePathName = function (oldPropertyName, pathObject){
        
        if(pathObject.pathDefinition.hasOwnProperty(oldPropertyName) && pathObject.newName){
           
            pathObject.pathDefinition[pathObject.newName] = pathObject.pathDefinition[oldPropertyName];
            delete pathObject.pathDefinition[oldPropertyName];
           
            pathObject.currentName= pathObject.newName;
           pathObject.newName = "";
        }
        

    };
    
    /*
        Add a new path object to the array containing all the paths
    */
    $scope.addPath = function(){
        $scope.paths.push(new Path());

        console.log($scope.paths);
    };
    
    /*
        deletes a specified path from the list of paths
    */
    $scope.deletePath = function(paths, index){
           paths.splice(index, 1);
    };
    
    /*
        Compile all of the paths into the json swagger representation
    */

}]);