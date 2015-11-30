var swaggerGE = angular.module("SwaggerGraphicalEditor", ['ui.materialize']);

swaggerGE.directive("pathCreator", ['$compile', function($compile) {
    return {

        link: function(scope, element, attrs){

            element.bind("click", function(){
                angular.element(
                    document.getElementById('addPath'))
                    .append($compile('<info-item  enabled-info="editorEnabled" swagger-base="basicInfo" item="name" disable-edit="disableEditors()" enable-edit="enableEditor(property)"></info-item>')(scope));
		      });

        }
    }
}]);

/*swaggerGE.directive("pathModal", ["$interval", function($interval) {
    return {
        restrict: "A",
        compile:null,
        link: function(scope, elem, attrs) {
            //On click
            if(scope.triggerModal){
                $('.modal-trigger').leanModal();
                scope.triggerModal = false;
            }
            //console.log('triggerModal');
            //$('.modal-trigger').leanModal();

        }
    }
}]);*/

/*swaggerGE.directive("paramModal", ["$interval", function($interval) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            //On click
            //if(scope.triggerModal){
            console.log('paramModal');
                $('.param-modal-trigger').leanModal();
            //    scope.triggerModal = false;
            //}
            //console.log('triggerModal');
            //$('.modal-trigger').leanModal();

        }
    }
}]);*/

/*swaggerGE.directive("addParam", ["$interval", function($interval) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
           // console.log(scope);
           //console.log("ATTEMPTING!!!!!!!!!!!!!!!!!!!!!");
            //$('select').material_select();
            if(element.is("select")){
                //console.log("IS SELECT");
                element.material_select();
            }

        }
    }
}]);*/

/*swaggerGE.directive("initCollapse", ["$interval", function($interval) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
           // console.log(scope);
           //console.log("ATTEMPTING!!!!!!!!!!!!!!!!!!!!!");
            //$('select').material_select();
            if(element.hasClass('collapsible')){
                //console.log("IS SELECT");
                element.collapsible({
                  accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });
            }

        }
    }
}]);*/

/**
 *  Mark updated
*/
swaggerGE.directive("selectValue", function(){
    return {
        link: function(scope, element, attrs){

           scope.$watch('updateParamModal', function(update){
               if(update){
                   var paramIn = scope.currentParam.inLocation;

                   for(var i = 1; i < 6; i++){
                        //console.log(element.children()[i]);
                        //console.log(element.children()[i].value);
                        if(paramIn === element.children()[i].value){

                            var child = angular.element(element.children()[i]);
                            child.attr('selected', '');
                        }
                    }

                   scope.updateParamModal = false;
               }
           })

        }
    }
});

swaggerGE.directive("resetValue", function(){
    return {
        link: function(scope, element, attrs){
            scope.$watch('', function(update){

            });
        }
    }
});


swaggerGE.directive("uniqueCheckbox", ["$interval", function($interval) {
    return {
        restrict: "AE",
        templateUrl: 'js/templates/checkboxTemplate.html',
        replace: true,
        scope: {
            toggleOp: '&',
            uniqueId: '&',
            pathObject: '=',
            operation: '@'
        },
        link: function(scope, elem, attrs) {

            //var uid = scope.uniqueId({pathObj: scope.pathObject, oprtn: scope.operation});

            var input = angular.element(document.getElementById('input'));
            input.removeAttr('id');
            input.attr('id', scope.$id);

            var label = angular.element(document.getElementById('label'));
            label.removeAttr('id');
            label.removeAttr('for');
            label.attr('for', scope.$id);

            //console.log(scope);

            thisOperation = scope.operation.toLowerCase();
            //console.log(thisOperation);
            //console.log(scope.pathObject.currentPathOperations);
            //console.log(scope.pathObject.currentPathOperations[thisOperation]);
            //check if this operation was chosen and add the checkmark if it has been.

            if(scope.pathObject.currentPathOperations[thisOperation]){
              //  console.log('success');
                input.attr('checked', 'checked');
            }
            //console.log('------------');
        }
    }
}]);

swaggerGE.controller("paramController", ['$scope', '$log', 'swaggerPathsService', function(scope, log, swaggerPaths){
    "use strict";
    
    scope.currentParameterPath = swaggerPaths.chosenParameter;
    
    scope.currentParam;
    
    $scope.$watch("currentParam", function(oldVal, newVal){
        
        log.log(oldVal + ", " + newVal);
    });
    
    
    
}]);
swaggerGE.controller("swaggerBaseController", ['$scope', '$log', 'swaggerBaseService', function($scope, $log, swaggerBaseService){
    
    //display functionality
    $scope.preventUpdate = true;

    
    //get the basic info.
    $scope.basicInfo = swaggerBaseService.newBaseInfo();
    
    //used to test the base info singleton
    $scope.service = null;
    
    
    $scope.updateInfo = function(){
        swaggerBaseService.setSwaggerInfo($scope.basicInfo);
        $scope.service = swaggerBaseService.getSwaggerInfo();
    };
    
    /*
        watch for Api's version number and title
            These are required as part of the SWAGGER definition
    */
    $scope.$watch('basicInfo.info.title', function(){
        $scope.checkMinRequirements();
        //console.log($scope.basicInfo.info.title)
    }, false);
    $scope.$watch('basicInfo.info.version', function(){
        $scope.checkMinRequirements();
    }, false);
    
    $scope.checkMinRequirements = function(){
        if(!$scope.basicInfo.info.title || !$scope.basicInfo.info.version)
            $scope.preventUpdate = true;
        else
            $scope.preventUpdate = false;
    }
    
    /*
        Update the schemes list. Add the scheme if checked, and remove if unchecked
    */
    $scope.updateCheckBox = function(schemeType){
        
        var removedScheme = false;
        
        //check the values in scheme
        for(var i = 0; i < $scope.basicInfo.schemes.length; i++){
            
            if($scope.basicInfo.schemes[i] === schemeType){
                //if its in the list remove it
                $scope.basicInfo.schemes.splice(i, 1);
                
                removedScheme = true;
                
            }     
        }
        
        //if a scheme hasnt been removed, it means it didn't exist so add it to the list.
        if(!removedScheme)
            $scope.basicInfo.schemes.push(schemeType);
        
    }
    
    
}]);
swaggerGE.controller("swaggerPaths", ['$scope', '$log', 'swaggerPathsService', 'swaggerCompiler', '$window', function($scope, $log, swaggerPaths, swaggerCompiler, $window){

     "use strict";
    /*
        Default
    */
    var Path = new swaggerPaths.Path();

    var Verb = swaggerPaths.newHttpVerb();

    //create an object for the initial operations
    //  used when creating new paths
    function InitialOperations(){
        this.post = false;
        this.get = false;
        this.put = false;
        this.delete = false;
    }

    /*
        VerbOperation Object
    */
    function VerbOperation(){
        this.tags = null;
        this.summary = null;
        this.description = null;
        this.externalDocs = new Object(); //should be an ExternalDocs Object
        this.operationId = null;
        this.consumes = null;
        this.produces = null;
        this.parameters = new Object(); //should be a Parameter Object
        this.responses = new Object(); //should be a Responses object
        this.schemes = null;
        this.depreciated = null;
        this.security = new Object(); //should be a Security Object

    }

    $scope.paths=[];

    $scope.swaggerPaths = swaggerPaths;

    $scope.swagger = swaggerCompiler.getSwaggerFile();
    $scope.spaths = swaggerPaths.getPaths();

   /* $scope.$watch("paths", function(){
        $scope.spaths = swaggerPaths.getPaths();
        console.log($scope.spaths)
    })
*/
    $scope.showPaths = true;
    $scope.preventPathCreation = true;

    $scope.newPathName = "";
    $scope.initialPathOperations = new InitialOperations();

    //var operationsToUpdate = [];

    //used to test the
    $scope.ps = swaggerPaths.getPaths();

    //$scope.deleteConfirmed = false;

    $scope.showTable = true;

    //$scope.dumb = "";
    $scope.paramIn ="";

    //watch when
    $scope.$watch("newPathName", function(){
        //only check if unique if it is not blank
        if($scope.newPathName)
            $scope.preventPathCreation = isUnique($scope.newPathName) ? false : true;
        else
            $scope.preventPathCreation = true;
    });

    $scope.$watch("dumb", function(newVal, oldVal){
        $log.log(newVal + ", " + oldVal);
    })

  //  $scope.$watchCollection("paths", function() {
       // swaggerPaths.setPaths($scope.paths);
       /* console.log('CCONTROLLER PASSING PATHS');
        console.log($scope.paths);
        console.log('------------------------------------');*/
   //     console.log(swaggerPaths.getPaths());
   //     $scope.ps = swaggerPaths.getPaths();
       // $scope.swagger = swaggerCompiler.getSwaggerFile();
   // });

    //$scope.watch("paths.")

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
                    currentPath.pathDefinition[newPath][operation] = new VerbOperation();
                    //adds operation to the singleton
                    swaggerPaths.addOperation(newPath, operation);
                }

            }

            //reset path creation variables
            $scope.newPathName = "";
            $scope.preventPathCreation = true;

            //in path creation modal reset checkmarks and if they were checked off previously remove them.
            $scope.initialPathOperations = new InitialOperations();
            angular.element(document.getElementById('post')).removeAttr('checked');
            angular.element(document.getElementById('get')).removeAttr('checked');
            angular.element(document.getElementById('put')).removeAttr('checked');
            angular.element(document.getElementById('delete')).removeAttr('checked');



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

            path.pathDefinition[pathName][operation] = new VerbOperation();
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

    /*function deleteModal(){

        $('.delete-modal').leanModal();
        $('#delete-modal').openModal();
    }*/

    /*$scope.initCollapse = function(){
        $('.collapsible').collapsible({
              accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });

        //$('select').material_select();
    };*/

    $scope.getCheckboxId = function(path, operation) {
        console.log('get checkob id');

        return path.currentName + "-" + operation;
    };

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

        path.newParam = "";
        //$scope.updateParamModal = true;
        //$scope.triggerModal = true;

        //$scope.currentParam = swaggerPaths.chosenParameter;//swaggerPaths.getParam(pathName, operation, paramName, paramInLocation);
        //console.log($scope.currentParam);

    }

    $scope.updateParam = function(path, operation, paramName, paramInLocation){
       //pathName, operation, paramName, paramIn
    }

    $scope.initParamData = function(pathName, operation, paramName, paramInLocation){
        /*console.log("INIT PRAM DATA");
        console.log($scope.currentParam);
        $scope.currentParam = swaggerPaths.getParam(pathName, operation, paramName, paramInLocation);
        console.log($scope.currentParam);
        console.log(swaggerPaths.chosenParameter);*/
        //swaggerPaths.chosenParameter = {path: pathName, operation: operation, paramName: paramName, inLoc: paramInLocation};
        swaggerPaths.chosenParameter = swaggerPaths
          .getParam(pathName, operation, paramName, paramInLocation);



    };

    $scope.setParamIn = function(inLocation){
        $scope.paramIn = inLocation;

    }

    $scope.setParamInModal = function(inLocation){
      $scope.currentParam.inLocation = inLocation;
    }

    //$scope.currentParameterPath = swaggerPaths.chosenParameter;
    $scope.currentParam = {};
    $scope.tempParam = {};

    /*$scope.$watch("currentParam.name", function(newVal, oldVal){

       // console.log(newVal);
    });*/

    //$scope.updateParamModal = false;

    $scope.updateParam = function(param){
      
    }

    $scope.$watch(function(){ return swaggerPaths.chosenParameter;}, function(newVal){
        $scope.currentParam = newVal;

        $scope.tempParam = clone($scope.currentParam);

        console.log($scope.tempParam);
        //$scope.Modal = true;

        //$scope.currentParam.name = newVal.name;
       // console.log(newVal);
        //console.log($scope.currentParam);
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

      //$scope.currentParam.dummy = true;
      //$scope.currentParam.name = "ROAR";

      console.log("updateing param required");
      console.log($scope.currentParam);
    }

    //$scope.showParamModal = function(){
    //    $scope.updateParamModal = true;
    //}

   // $('.modal-trigger').leanModal();
    //$scope.poop = "POOP!"
    //$scope.triggerModal = true;

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

swaggerGE.directive("infoItem", [function(){
    return {
        restrict: 'E',
        templateUrl: 'js/templates/infoItemTemplate.html',
        replace: true,
        scope: {
            enabledInfo: '=',
            swaggerBase: '=',
            item: "@",
            disableEdit: "&",
            enableEdit: "&"
        },
        link:
            function(scope, element, attrs ){
                //console.log(element);
                //console.log(attrs);

                //element.bind('click',)
            }
    }

}]);

swaggerGE.factory('OperationModel', [function(){
    
    //function Operation()
    
}])
swaggerGE.factory("ParameterService", [function(){
  var Parameter = function(name, inLocation){
      this.name = name || "",
      this.inLocation = inLocation || "";
      this.description = null;
      this.required = (this.inLocation === "path") ? true : false;
      this.schema = new Object();
  }

  Parameter.prototype = {
      setName: function(newName){
          if(debug)
              console.log("Setting Param 'name': " + newName);

          this.name = newName;
      },

      getName: function(){
          return this.name;
      },

      setIn: function(newInLocation){
          if(debug)
              console.log("Setting Param 'in': " + newInLocation);

          this.inLocation = newInLocation;
      },

      getIn: function(){
          return this.inLocation;
      },

      setDescription: function(newDesc){
          if(debug)
              console.log("Setting Param 'description':" + newDesc);

          this.description = newDesc;
      },

      getDescription: function(){
          return this.description;
      },

      isRequired: function(flag){
          if(debug)
              console.log("Setting Param 'required':" + flag);

          this.required = flag;
      },

      getRequired: function(){
        return this.required;
      },

      getJSON: function(){

          var paramJSON = {};

          if(this.name){
              paramJSON.name = this.name;
          }

          if(this.inLocation){
              paramJSON.in = this.inLocation;
          }

          if(this.description){
              paramJSON.description = this.description;
          }

          paramJSON.required = this.required;

          /*return {
              name: this.name,
              in: this.inLocation,
              description: this.description,
              required: this.required
          }*/

          return paramJSON;
      }

  }

}])

swaggerGE.service("ResponseService",["$scope", function($scope){
    
    function Response(){
        this.description = null;
        this.headers = {};
        
        
    }
    
    function Header(name){
        this[name] = new HeaderObject();
        
        this.HeaderObject = function(){
            return {
                description:"",
                type:"",
                format:"",
                items: new Object(), //should be an 'items' object
                collectionFormat:"",
                
                
            }
        }
        
    }
    
    function Headers(){
        
        this.addHeader = function(headerName){
            return new Header(headerName);
        }
    }
    
}]);
swaggerGE.service("swaggerBaseService", ["swaggerCompiler",function(swaggerCompiler){

    var self = this;
    var swaggerInfo = {};
    
    return{
        /*
            TODO: Have the passed object be copied to swaggerInfo instead of being assigned by reference.
        */
        setSwaggerInfo: function(newInfo){
            swaggerInfo = newInfo;
            swaggerCompiler.updateInfo(swaggerInfo);
            //console.log('updateInfo from base info service');
            //console.log(swaggerInfo);
            
        },

        getSwaggerInfo: function() {
            return swaggerInfo;
        },

        newBaseInfo: function(){
            return {
                    swagger: "2.0",
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
                   schemes: [],
                   consumes: "",
                   produces: ""
            }
        }
    }
    
}]);

swaggerGE.service("swaggerPathsService", ['swaggerCompiler', function(swaggerCompiler){
    "use strict";

    var self = this;

    var debug = true;

    //var paths = [];

    var paths = {};

    self.chosenParameter = {};

    /* create an object with that holds the basic info of a swagger document*/
    this.Path= function(pathName){
        return {
            currentName:  "pathName",
            newName:"",
            currentPathOperations : {
                post:false,
                get:false,
                put:false,
                delete:false
            },
            newParam: "",
            //isCollapsed:false,
            pathDefinition: {
                pathName: {

                }
            }
        }
    }

    this.NewPath = function(pathName){
        paths[pathName] = new Object();
    }

    this.removePath = function(pathName){
        delete paths[pathName];
    };

    this.getPaths= function(){
        return paths;
    };

    this.setPaths= function(newPaths){
      paths = newPaths;
        console.log('updatePaths from paths service');
        console.log('\t current paths');
        console.log(paths);
        //console.log(paths);
        //var i = 0;

        //only store path definition of the path
        var defArray = {};
        for(var path in paths){
            //only update the document if the path is unique
            if(path.isUnique){
                currentPath = paths[path];

                defArray[currentPath.currentName] = currentPath.pathDefinition[currentPath.currentName];

                }
        }
        console.info(defArray);
        //swaggerCompiler.updatePaths(defArray);
        console.log('------------------------------------');
    };

    this.addPath = function(pathName){
        paths[pathName] = new Object();
    };


    this.newHttpVerb= function(){
       return {
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
    };
    this.newResponse= function(){
        return {
            description: "",
            schema: {},
            headers: {},

        }
    };

    /*
       used to create single header objects that will
        be used in response objects
    */
    this.newHeader= function(){
        return{
            description: "",
            type: "",
            format: "",
            items: {}
        }
    };


/************** OPERATION FUNCTIONS *******************/

    var Operation = function(){
        this.tags = null;
        this.summary = null;
        this.descripiton = null;
        this.externalDocs = new Object();
        this.operationId = null;
        this.consumes = null;
        this.produces = null;
        this.parameters = new Parameters();
        this.responses = new Object();
        this.schemes = null;
        this.deprecated = false;
        this.security = new Object();
    };

    Operation.prototype = {

        addParameter: function(paramName, paramIn){
            //if the parameter does not exist for this operation add it.
            if(!this.parameters.hasParameter){
                this.parameters.addParameter(paramName, paramIn);
            }
        },

        getJSON: function(){
            var operationJSON = {};

            for(var property in this){
                console.log(property);
                if(this[property]){
                    //if(property === "parameters");
                    operationJSON[property] = this[property];

                }
            };

            return operationJSON;

        }



    };

    /* TODO make a separate Operations class */
    this.addOperation = function(path, operation){
        //console.log(paths[path]);

        console.log("PATH SERVICE: adding operation");
        console.log(path);
        console.log(paths[path]);
        console.log(operation)
        paths[path][operation] = new Operation();

        console.log(paths[path][operation]);


        //paths[path][operation] = new Operation();

        //paths[path][operation].responses = [];

    }

    /*
        Deletes an operation from a given service.
    */
    this.deleteOperation = function(path, operation){

        delete paths[path][operation];

    }

/************** PARAMETER(S) FUNCTIONS *******************/

    var Parameters = function(){
        this.parameterList = new Array();
    }

    Parameters.prototype = {
        /*
            This function add a new Parameter Object to the ParameterList
                By the Swagger definitions, "name" and "in" properties are
                required when making any parameter.
        */
        addParameter: function(paramName, paramIn){
            if(debug)
                console.log("PARAMETERS - Adding Param: " + paramName + ", " + paramIn);

            this.parameterList.push(new Parameter(paramName, paramIn));

            if(debug){
                console.log("PARAMETERS - Addws Param, paramList:  ");
                console.log(this.parameterList);
                console.log("-----------------------------------------------------")
            }
        },

        /*
            By the Swagger definition, each parameter is uniquely identified by
                The combination of the Parameter's "name" and "in" properties.
        */
        removeParameter: function(paramName, paramIn){
            if(debug)
                console.log("PARAMETER - Removing Param: " + paramName + ", " + paramIn);

            this.parameterList.forEach(function(parameter, index, paramList){
                if(parameter.name === paramName && parameter.inLocation === paramIn){
                    console.log("Removing: ");
                    console.log(paramList[index]);
                    console.log(parameter)
                    paramList.splice(index, 1);
                    return;
                }
            })

        },

        /*
            This function checks to see if the passed Parameter already Exists.
        */
        hasParameter: function(paramName, paramIn){
            if(debug)
                console.log("PARAMETER: Validating Param: " + paramName + ", " + paramIn);

            var found = 0;

            this.parameterList.forEach(function(parameter, pos, paramList){
                if(parameter.name === paramName && parameter.inLocation === paramIn){

                    found = 1;

                    return;
                }
            })

            if(found)
                return true;
            else
                return false;
        },

        /*

        */
        getParameterList: function(){
            var paramListClean = new Array();
            this.parameterList.forEach(function(parameter, index, paramList){
                console.log(parameter.getJSON());
               paramListClean.push(parameter.getJSON());
            });

            console.log(paramListClean);

            return paramListClean;
        },

        getParameter:function(name, inLoc){

            console.log("---\nGETPARAM");
            console.log(name + ", " + inLoc);
            var param;
            this.parameterList.forEach(function(parameter, index, paramList){
                console.log('-');
                console.log(parameter);
                console.log(parameter.name + ", " + name + ", " + parameter.inLocation + ", " + inLoc);
                if(parameter.name === name && parameter.inLocation === inLoc){
                    param = parameter;
                    console.log("hit!");
                }
            });

            console.log(param);
            console.log("---");
            return param;
        }
    }

    var Parameter = function(name, inLocation){
        this.name = name || "",
        this.inLocation = inLocation || "";
        this.description = null;
        this.required = (this.inLocation === "path") ? true : false;
        this.schema = new Object();
    }

    Parameter.prototype = {
        setName: function(newName){
            if(debug)
                console.log("Setting Param 'name': " + newName);

            this.name = newName;
        },

        getName: function(){
            return this.name;
        },

        setIn: function(newInLocation){
            if(debug)
                console.log("Setting Param 'in': " + newInLocation);

            this.inLocation = newInLocation;
        },

        getIn: function(){
            return this.inLocation;
        },

        setDescription: function(newDesc){
            if(debug)
                console.log("Setting Param 'description':" + newDesc);

            this.description = newDesc;
        },

        getDescription: function(){
            return this.description;
        },

        isRequired: function(flag){
            if(debug)
                console.log("Setting Param 'required':" + flag);

            this.required = flag;
        },

        getRequired: function(){
          return this.required;
        },

        getJSON: function(){

            var paramJSON = {};

            if(this.name){
                paramJSON.name = this.name;
            }

            if(this.inLocation){
                paramJSON.in = this.inLocation;
            }

            if(this.description){
                paramJSON.description = this.description;
            }

            paramJSON.required = this.required;

            /*return {
                name: this.name,
                in: this.inLocation,
                description: this.description,
                required: this.required
            }*/

            return paramJSON;
        }

    }

    this.newParam = function(name, id){
      return new newParameter(name, id);
    }

    /*
        Tries to create and validate a new parameter object.
    */
    this.addNewParam = function(pathName, operation, paramName, paramIn){
        if(debug){
            console.log("PATH SERVICE: Attempting to add a new Parameter");
            console.log(pathName);
            console.log(operation);
            console.log(paramName);
        }

        var pIn = paramIn || "query";

        var path = paths[pathName][operation];

        if(validateParam(pathName, operation, paramName, pIn)){
            path.parameters.addParameter(paramName, pIn);
            self.chosenParameter = {
                path:pathName,
                operation:operation,
                paramName:paramName,
                inLoc:pIn
            }
        }else{
            throw "Invalid Parameter Name, must be unique."
        }
    }

    /*
        This
    */
    this.getParamList = function(pathName, operation){

        var currentPath = paths[pathName][operation];
        //console.log("LJFLAFJALKFJALF");
        //console.log(pathName);

        //console.log(currentPath);

        //console.log(currentPath.parameters);

        return currentPath.parameters.getParameterList();

    }

    this.getParam = function(pathName, operation, paramName, paramIn){
        console.log("------------------\nGETTING PARAM NAME");
        console.log(pathName + ", " + operation + ", " + paramName + ", " + paramIn);
        var paramObject = paths[pathName][operation].parameters.getParameter(paramName, paramIn);
        console.log(paramObject);
        console.log("------------------");
        return paramObject
    };

    /*
        Checks to see if the given param name is valid for the given path.
    */
    var validateParam = function(pathName, operation, paramName, paramIn){
        if(debug)
            console.log("PATH SERVICE: Validating Param: " + paramName + ", " + paramIn + ", " + pathName + ", " + operation);

        var path = paths[pathName][operation];

        if(path.parameters.hasParameter(paramName, paramIn)){
            if(debug)
                console.log("\t Same Parameter found, returning false!");

            return false;
        }else{
            if(debug)
                console.log("\t Parameter NOT found, returning true!");

            return true;
        }
    }


}]);

swaggerGE.factory("swaggerBuilder", [function(){


}]);
swaggerGE.service("swaggerCompiler", [function(){
    var self = this;
    
    var info = {};
    var paths = {};
    
    var swaggerFile=null;
    
    
    //this method to compile information is not optimized
    this.updateInfo = function(newInfo){
        info = newInfo;
        compileSwaggerData();
        console.info('COMPILER SERVICE- INFO');
        console.log(info);
        console.log(swaggerFile);
        console.log('------------------------------------');
    }
    
    this.updatePaths = function(newPaths){
        paths = newPaths;
        compileSwaggerData();
        console.info('COMPILER SERVICE- PATHS');
        console.info(newPaths);
        console.log(paths);
        console.log(swaggerFile);
        console.log('------------------------------------');
    }
    
    var compileSwaggerData = function(){
        
        swaggerFile = {};
        
         console.info('COMPILER SERVICE- COMPILING');
        
        for(item in info){
            swaggerFile[item] = info[item];
        
        }
        
        for(path in paths){
            swaggerFile.paths[path] = paths[path];
        }
        
         console.info('COMPILER SERVICE- DONE COMPILING');
        console.info(swaggerFile);
        console.log('------------------------------------');
    }
    
    this.getSwaggerFile = function(){
     return swaggerFile;   
    }
        
}]);