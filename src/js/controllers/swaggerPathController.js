swaggerGE.controller("swaggerPaths", ['$scope', '$log', 'swaggerPathsService', 'swaggerCompiler', '$window', function($scope, $log, swaggerPaths, swaggerCompiler, $window){

     "use strict";
    /*
        Default
    */
    var Path = new swaggerPaths.Path();

    var Verb = swaggerPaths.newHttpVerb();

    $scope.paths=[];

    $scope.swaggerPaths = swaggerPaths;

    //used to test the services
    $scope.ps = swaggerPaths.getPaths();
    $scope.swagger = swaggerCompiler.getSwaggerFile();
    $scope.spaths = swaggerPaths.getPaths();

    $scope.showPaths = true;
    $scope.prevent = {
      pathCreation: true,
      paramConfig: true,
    }

    $scope.newPathName = "";
    $scope.initialPathOperations = {
      post: false,
      get: false,
      put: false,
      delete: false,
    }

    $scope.showTable = true;

    $scope.paramIn ="";

    $scope.currentParam = {};
    $scope.tempParam = {};

    $scope.closePathModal = false;

    //watch when
    $scope.$watch("newPathName", function(){
        //only check if unique if it is not blank
        if($scope.newPathName)
            $scope.prevent.pathCreation = isUnique($scope.newPathName) ? false : true;
        else
            $scope.prevent.pathCreation = true;
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


            //updateUniquePaths();
        }else{
            $scope.toastUser();
            pathObject.newName = pathObject.currentName;
        }



    };

    /*
        Add a new path object to the array containing all the paths
    */
    $scope.addPath = function(){

        var newPath = $scope.newPathName;

        if(isUnique(newPath)){
            //add a new path

            console.log("VALID NEW PATH");

            $scope.paths.push(new swaggerPaths.Path());
            swaggerPaths.addPath(newPath);

            //set the name of the path object
            var latestPathLocation = $scope.paths.length - 1;
            $scope.paths[latestPathLocation].newName = newPath;
            $scope.updatePathName($scope.paths[latestPathLocation].currentName, $scope.paths[latestPathLocation])

            $scope.paths[latestPathLocation].currentPathOperations = $scope.initialPathOperations;

            //create the initial path verb operation specified
            for(var operation in $scope.initialPathOperations){

                if($scope.initialPathOperations[operation] === true){
                  /* console.log("CURRENT OP");
                    console.log(operation);
                console.log($scope.initialPathOperations);*/
                    var currentPath = $scope.paths[latestPathLocation];
                    currentPath.pathDefinition[newPath][operation] = swaggerPaths.newOperation();
                    //adds operation to the singleton
                    swaggerPaths.addOperation(newPath, operation);
                }

            }

            //reset path creation variables
            $scope.newPathName = "";
            $scope.prevent.pathCreation = true;


            //in path creation modal reset checkmarks and if they were checked off previously remove them.
            $scope.initialPathOperations = {
              post: false,
              get: false,
              put: false,
              delete: false,
            }

            $scope.closePathModal = true;
            //angular.element(document.getElementById('post')).removeAttr('checked');
            //angular.element(document.getElementById('get')).removeAttr('checked');
            //angular.element(document.getElementById('put')).removeAttr('checked');
            //angular.element(document.getElementById('delete')).removeAttr('checked');



        }else{
           //TODO: MAKE A TOAST CALL A SEPARATE FUNCTION
            //Materialize.toast('Not a unique name!', 2000);
            $scope.toastUser();
        }

    };

    /*
        toast user with a default toast message if one is not provided
    */
    $scope.toastUser = function(toastMessage, timeToShow){
        Materialize.toast(toastMessage||'Not a unique name!', timeToShow || 3000);
    }

    /*
        deletes a specified path from the list of paths
    */
    $scope.deletePath = function(paths, index){
        swaggerPaths.removePath($scope.paths[index].currentName);
        paths.splice(index, 1);
    };

    /*
        Private function to check if a given name is already defined as a path
    */
    var isUnique = function(newPathName){
        for(var i=0; i < $scope.paths.length; i++){
            if(newPathName === $scope.paths[i].currentName)
                return false;
        }

        return true;
    }


    /*
        This method is used when creating a new path object to update
            the true/false value of the initial operations selection.
    */
    $scope.updateInitialOperation = function(operation){

        $scope.initialPathOperations[operation] = !$scope.initialPathOperations[operation];
        //console.log($scope.initialPathOperations[operation]);

    }

    $scope.showOperations= function(path){
        if((path.currentPathOperations.post || path.currentPathOperations.get || path.currentPathOperations.put || path.currentPathOperations.delete)
           || (!path.currentPathOperations.post && !path.currentPathOperations.get && !path.currentPathOperations.put && !path.currentPathOperations.delete))
            return true;
        else
            return false;


    }

    $scope.togglePathOperation = function(path, operation){
        path.currentPathOperations[operation] = !path.currentPathOperations[operation];

        //console.log("PATH OP");

        var pathName = path.currentName;

        //if adding a new operation
        if(path.currentPathOperations[operation]){

            path.pathDefinition[pathName][operation] = swaggerPaths.newOperation();
            //path.pathDefinition[pathName][operation] = swaggerPaths.getParameterList
            swaggerPaths.addOperation(pathName, operation);
        }
        //if removing an operation
        else{

            if($window.confirm('Are you sure you want to delete?')){

                swaggerPaths.deleteOperation(pathName, operation);

                delete path.pathDefinition[pathName][operation];

            }else{
                //angular
                console.log('DONT DELETE');
                path.currentPathOperations[operation] = !path.currentPathOperations[operation];

            }

        }
    }

    //Param methods
    $scope.addParam = function(path, operation, paramName, paramInLocation){

       // console.log("ADD PARAM!");
        var pathName = path.currentName;

        try{
            swaggerPaths.addNewParam(pathName, operation, paramName, paramInLocation);

        }catch(e){
            console.log(e);
            $scope.toastUser("Not a unique parameter/query combo.");
        }

        path.pathDefinition[pathName][operation].parameters = swaggerPaths.getParamList(pathName, operation);

        path.newParam[operation] = "";

    }

    $scope.updateParam = function(path, operation, paramName, paramInLocation){
       //pathName, operation, paramName, paramIn
    }

    $scope.updateParam = function(param){

    }

    $scope.initParamData = function(pathName, operation, paramName, paramInLocation){
      swaggerPaths.chosenParameter = swaggerPaths.getParam(pathName, operation, paramName, paramInLocation);

    };

    $scope.setParamIn = function(inLocation){
        $scope.paramIn = inLocation;

    }

    $scope.setParamInModal = function(inLocation){
      $scope.currentParam.inLocation = inLocation;
    }

    $scope.$watch(function(){ return swaggerPaths.chosenParameter;}, function(newVal){


        $scope.currentParam = newVal;

        //console.log(newVal);
        //console.log($scope.currentParam);


        $scope.tempParam = clone($scope.currentParam);

        $scope.tempParam.schema = JSON.stringify($scope.tempParam.schema);

        console.log($scope.tempParam);

    });

    $scope.paramRequired = function(){

      console.log($scope.currentParam);

      if($scope.currentParam.required){
        console.log("required true");
        $scope.currentParam.required = false;
      }else{
        console.log("required false");
        $scope.currentParam.required = true;
      }

      console.log("updateing param required");
      console.log($scope.currentParam);
    }


    function clone(obj) {
      // Handle the 3 simple types, and null or undefined
      if (null == obj || "object" != typeof obj){
        console.log("null or not string");
        return obj;
      }

      // Handle Date
      if (obj instanceof Date) {
        console.log("Copying Date");

          var copy = new Date();
          copy.setTime(obj.getTime());
          return copy;
      }

      // Handle Array
      if (obj instanceof Array) {
        console.log("Copying Array");
          var copy = [];
          for (var i = 0, len = obj.length; i < len; i++) {
              copy[i] = clone(obj[i]);
          }
          return copy;
      }

      // Handle Parameter
      /*if(obj instanceof swaggerPaths.Parameter) {
        console.log("Copying Parameter");
        var copy = new Parameter();
        for (var attr in obj){
          if(obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }

        return copy;
      }*/

      // Handle Object
      if (obj instanceof Object) {
        console.log("Copying Object");

          var copy = {};
          for (var attr in obj) {
              if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
          }
          return copy;
      }

      throw new Error("Unable to copy obj! Its type isn't supported.");
    }

}]);
