swaggerGE.controller("swaggerPaths", ['$scope', '$log', 'swaggerPaths', 'swaggerCompiler', function($scope, $log, swaggerPaths, swaggerCompiler){
    
    /*
        Default
    */
    var Path = swaggerPaths.newPath();
    
    var Verb = swaggerPaths.newHttpVerb();
    
    $scope.paths=[];
    
    $scope.swagger = swaggerCompiler.getSwaggerFile();
    
    //used to test the
    $scope.ps = swaggerPaths.getPaths();
    
    $scope.$watchCollection("paths", function() {
       // swaggerPaths.setPaths($scope.paths);
       /* console.log('CCONTROLLER PASSING PATHS');
        console.log($scope.paths);
        console.log('------------------------------------');*/
        console.log(swaggerPaths.getPaths());
        $scope.ps = swaggerPaths.getPaths();
       // $scope.swagger = swaggerCompiler.getSwaggerFile();
    });
    
    $scope.editorEnabled = "";
    
    $scope.disableEditors= function(){
        $scope.editorEnabled = "";
    };
    
    $scope.enableEditor= function(property){
        $scope.editorEnabled = property;
        //console.log($scope.editorEnabled);
    };
    
    /*
        Used to update the path name in the path definition since the path name is the key
        of the path object
    */
    $scope.updatePathName = function (oldPropertyName, pathObject){
        
        if(pathObject.pathDefinition.hasOwnProperty(oldPropertyName) && pathObject.newName){
           
            pathObject.pathDefinition[pathObject.newName] = pathObject.pathDefinition[oldPropertyName];
            delete pathObject.pathDefinition[oldPropertyName];
           
            pathObject.currentName= pathObject.newName;
           //pathObject.newName = "";
        }
        
        
        updateUniquePaths();
        

    };
    
    /*
        Add a new path object to the array containing all the paths
    */
    $scope.addPath = function(){
        $scope.paths.push(new swaggerPaths.newPath());
        updateUniquePaths();
       // console.log($scope.paths);
    };
    
    /*
        deletes a specified path from the list of paths
    */
    $scope.deletePath = function(paths, index){
        paths.splice(index, 1);
        updateUniquePaths();
    };
    
    /*
        edit the selected http-verb & add the verb to the pathDefinition if it hasn't been already
    */
    $scope.selectVerb = function(path, verbType){
        
        console.log(path);
        if(!path.pathDefinition[path.currentName][verbType])
            path.pathDefinition[path.currentName][verbType] = new swaggerPaths.newHttpVerb();
        
        path.selectedVerb = verbType;
    };
    
    /*
        remove the selected verb from the list
    */
    $scope.deleteVerb = function(path){
        
        delete path.pathDefinition[path.currentName][path.selectedVerb];
        
        path.selectedVerb="";
        
    };
    
    
    /*
        Compile all of the paths into the json swagger representation
    */
    
    /*
        check if path name exists
        called after changes have been made to a path
        
        TODO: OPTIMIZE TO A BETTER SEARCH ALGORITHM
    */
    var updateUniquePaths = function(path, index) {
        console.log("UPDATE UNIQUE");
        for(var i=0; i < $scope.paths.length; i++){
            var currentPathName = $scope.paths[i].currentName;

            var isUnique = true;

            for(var j=0; j < $scope.paths.length; j++){
                if($scope.paths[i].currentName === $scope.paths[j].currentName && i != j)
                    unique = false;
            }
            
            $scope.paths[i].isUnique = isUnique;

        }

    }
    
}]);