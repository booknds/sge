swaggerGE.controller("swaggerPaths", ['$scope', '$log', 'swaggerPaths', 'swaggerCompiler', function($scope, $log, swaggerPaths, swaggerCompiler){
    
    /*
        Default
    */
    var Path = swaggerPaths.newPath();
    
    var Verb = swaggerPaths.newHttpVerb();
    
    $scope.paths=[];
    
    $scope.swagger = swaggerCompiler.getSwaggerFile();
    
    $scope.showPaths = true;
    
    $scope.newPathName = "";
    
    $scope.preventPath = true;
    
    //used to test the
    $scope.ps = swaggerPaths.getPaths();
    
    //watch when
    $scope.$watch("newPathName", function(){
        //only check if unique if it is not blank
        if($scope.newPathName)
              $scope.preventPath = isUnique($scope.newPathName) ? false : true; 
        else
            $scope.preventPath = true;
    });
    
    $scope.$watchCollection("paths", function() {
       // swaggerPaths.setPaths($scope.paths);
       /* console.log('CCONTROLLER PASSING PATHS');
        console.log($scope.paths);
        console.log('------------------------------------');*/
        console.log(swaggerPaths.getPaths());
        $scope.ps = swaggerPaths.getPaths();
       // $scope.swagger = swaggerCompiler.getSwaggerFile();
    });
    
    $scope.togglePaths = function(){
        //make sure there are paths to show
        if($scope.paths.length > 0)
            $scope.showPaths = !$scope.showPaths;
        
        //console.log($scope.showPaths);
    }
    
    /*
        Used to update the path name in the path definition since the path name is the key
        of the path object
    */
    $scope.updatePathName = function (oldPathName, pathObject){
        
        if(isUnique(pathObject.newName)){
        
            if(pathObject.pathDefinition.hasOwnProperty(oldPathName) && pathObject.newName){

                pathObject.pathDefinition[pathObject.newName] = pathObject.pathDefinition[oldPathName];
                delete pathObject.pathDefinition[oldPathName];

                pathObject.currentName= pathObject.newName;
               //pathObject.newName = "";
            }


            updateUniquePaths();
        }else{
               
        }
        

    };
    
    /*
        Add a new path object to the array containing all the paths
    */
    $scope.addPath = function(){
        
        //if(isUnique($scope.newPathName)){  
            $scope.paths.push(new swaggerPaths.newPath());
            
            latestPathLocation = $scope.paths.length - 1;
        
            $scope.paths[latestPathLocation].newName = $scope.newPathName;
            
            $scope.updatePathName($scope.paths[latestPathLocation].currentName, $scope.paths[latestPathLocation])
        
            //reset path creation variables
            $scope.newPathName = "";
            $scope.preventPath = true;
        //}else{
            
        //}
            Materialize.toast('I am a toast!', 4000);
        
        
        
        
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
    var updateUniquePaths = function() {
        console.log("UPDATE UNIQUE");
        for(var i=0; i < $scope.paths.length; i++){
            var currentPathName = $scope.paths[i].currentName;
            //console.log("\tcurrent path[" + i + "]: " + currentPathName);
            
            var isUnique = true;

            for(var j=0; j < $scope.paths.length; j++){
                
                //console.log("\t\tcurrent path[" + i + "]" + "[" + j + "]: " + $scope.paths[j].currentName);
                
                if($scope.paths[i].currentName === $scope.paths[j].currentName && i != j){
                    isUnique = false;
                    //console.log("UNIQUE FALSE");
                }
                
            }
            
            $scope.paths[i].isUnique = isUnique;

        }

    }
    
    var isUnique = function(newPathName){
        for(var i=0; i < $scope.paths.length; i++){
            if(newPathName === $scope.paths[i].currentName)
                return false;
        }
        
        return true;
    }
    
}]);