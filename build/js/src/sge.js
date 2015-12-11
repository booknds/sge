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

swaggerGE.directive("closePathModal", function(){
    return {
      link: function(scope, element, attrs){
        //console.log(scope);
        scope.$watch('closePathModal', function(update){
          //console.log("CLOSE PATH MODAL");
          if(scope.closePathModal === true){
            $('#path-creation-modal').closeModal();
            scope.closePathModal = false;
          }
        });


      }
    }
});

swaggerGE.directive("colorize", function(){
    return {
      scope: {

      },
      link: function(scope, element, attrs){

          /*
          ng-class="{'blue': '{{operation}}' == 'get',
            'orange': '{{operation}}' === 'put',
            'green': '{{operation}}' === 'post',
            'red': '{{operation}}' === 'delete', }"
            */
          //  operation = element.text();

//            if()

            console.log("operation: " + operation);

            switch(operation){

            }

        }
    }
});

/*swaggerGE.directive("modalFocus", function(){
    return {
      scope: {

      },
      link: function(scope, element, attrs){

          //attrs.focus

        }
    }
});*/
swaggerGE.directive("deepWatch", function(){
    return {
      scope: {
        param: '='
      },
      link: function(scope, element, attrs){

          scope.$watch('param', function(newValue, oldValue) {
            if (newValue){
            //  console.log("I see a data change!");
            //  scope. = angular.copy($scope.data);
            }

        },true);
    }
  }
});

swaggerGE.directive("uniqueCheckbox", ["$interval", function($interval) {
    return {
        restrict: "AE",
        //templateUrl: 'js/templates/checkboxTemplate.html',
        replace: true,
        scope: {
            //toggleOp: '&',
            //uniqueId: '&',
            //pathObject: '=',
            //operation: '='
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

            //console.log(scope.operation);

            //thisOperation = scope.operation.toLowerCase();
            //console.log(thisOperation);
            //console.log(scope.pathObject.currentPathOperations);
            //console.log(scope.pathObject.currentPathOperations[thisOperation]);
            //check if this operation was chosen and add the checkmark if it has been.

            //if(scope.pathObject.currentPathOperations[thisOperation]){
              //  console.log('success');
            //    input.attr('checked', 'checked');
            //}
            //console.log('------------');
        }
    }
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
"use strict";
swaggerGE.controller("parameterController", ['$scope', '$log', 'PathService', "ParameterModalService",
function($scope, log, swaggerPaths, pms){

    //scope.ameterPath = swaggerPaths.chosenParameter;

    //scope.am;
    var paramControl = this;

    //paramControl.am = {};

    paramControl.path = {
      name: null,
      operation: null,
    }

    paramControl.operation = null;

    paramControl.initController = function(pathName, operation){
      /*paramControl.path.name = pathName;
      paramControl.path.operation = operation;

      paramControl.operation = swaggerPaths.paths[pathName][operation];
      paramControl.parametersList = paramControl.operation.parameters.parameterList*/
      //pms.parameterToUpdate(swaggerPaths.paths[pathName][operation].parameters.parameterList)

    }

    //console.log(paramControl.operation);
    //console.log(paramControl.operation.parameters);

    paramControl.swaggerPaths = swaggerPaths;

    //paramControl.path = paramControl.paths;

    paramControl.parametersList = null;
    /*{
      post: paramControl.parameters.post.parameters,
      get: paramControl.parameters.get.parameters,
      put: paramControl.parameters.put.parameters,
      delete: paramControl.parameters.delete.parameters,
    };*/

    //paramControl.parametersList = swaggerPaths.paths[pathDefinition]

    paramControl.newParamData = {
      post:{
        name:null,
        inLocation:null,
      },
      get:{
        name:null,
        inLocation:null,
      },
      put:{
        name:null,
        inLocation:null,
      },
      delete:{
        name:null,
        inLocation:null,
      },
    }

  /*  $scope.$watch("am", function(oldVal, newVal){

        log.log(oldVal + ", " + newVal);
    });*/

    $scope.$watch(function(){return swaggerPaths.updateList}, function(newVal){

      if(newVal){
        if(newVal.update){
          console.log("watchhit")
          console.log(newVal);

          updateParamList(newVal.path, newVal.operation);
          $scope.$apply();
          console.log("print updated list");
          console.log(paramControl.parametersList);
          console.log("----done---")
          swaggerPaths.updateList = {};
        }
      }

    })

  /*  $scope.$watch(function(){ return swaggerPaths.chosenParameter;}, function(newVal){
          $scope.am = newVal;
          //console.log(newVal);
          //console.log($scope.am);
          $scope.tempParam = clone($scope.currentParam);
          $scope.tempParam.schema = JSON.stringify($scope.tempParam.schema);
          console.log($scope.tempParam);
      });*/

    //Param methods
    this.addParam = function(pathName, operation, paramName, paramInLocation){

       // console.log("ADD PARAM!");
        //var pathName = path.currentName;



        try{
            swaggerPaths.addNewParam(pathName, operation, paramName, paramInLocation);
            //$scope.parametersList = swaggerPaths.getParamList;
            //updateParamList(pathName, operation);
        }catch(e){
            console.log(e);
            //paramControl.toastUser("Not a unique parameter/query combo.");
            Materialize.toast("Parameter name/query combo' already exists", 3000);
        }

        //path.pathDefinition[pathName][operation].parameters = swaggerPaths.getParamList(pathName, operation);

        paramControl.newParamData[operation].name = "";



    }

    paramControl.editParamData = function(pathName, operation, paramName, paramInLocation){

      var temp = swaggerPaths.getParam(pathName, operation, paramName, paramInLocation);

      pms.parameterToUpdate(pathName, operation, temp);

    };



    function updateParamList(pathName, operation){
      console.log("updating param list");
      console.log(pathName);
      console.log(operation);
      paramControl.parametersList[operation] = angular.copy(swaggerPaths.getParamList(pathName,operation));
      console.log(paramControl.parametersList[operation])
      console.log("----- done updating param list -----")
    }

    //$scope.$watch("")

  /*  paramControl.paramRequired = function(){

      console.log(paramControl.am);

      if(paramControl.am.required){
        console.log("required true");
        paramControl.am.required = false;
      }else{
        console.log("required false");
        paramControl.am.required = true;
      }

      console.log("updateing param required");
      console.log(paramControl.am);
    }*/


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

swaggerGE.controller("ParameterModalController", ["$scope", "PathService", "ParameterModalService",
  function($scope, swaggerPaths, pms){

    var paramModal = this;

    paramModal.tempParam = {};
    var origianlParamData = {
      pathName:null,
      operation:null,
      parameter:null
    };

    $scope.$watch(function(){return pms.currentParameter}, function(newVal){
          //$scope.currentParam = newVal;
          //console.log(newVal);
          //console.log($scope.currentParam);
          //paramModal.tempParam = clone($scope.currentParam);
          if(newVal){
            var currentParam = newVal;
            console.log(currentParam);
            //originalParamData = pms.getCurrentParameter()
            origianlParamData.pathName = currentParam.pathName;
            origianlParamData.operation = currentParam.operation;
            origianlParamData.parameter = currentParam.parameter;

            paramModal.tempParam = angular.copy(currentParam.parameter);

            if(paramModal.tempParam.schema){
              paramModal.tempParam.schema = JSON.stringify(paramModal.tempParam.schema);
            }
            console.log("TEMP PARAM");
            console.log(paramModal.tempParam);
            $scope.$apply();
          }


      });

      paramModal.updateParameter = function(){
        try{
          console.log("updateParam");
          swaggerPaths.updateParameter(originalParamData, paramModal.tempParam);
          //console.log("poop")
          //console.log(paramModal.tempParam.originalValues.path);
          //paramControl.updateParamList(paramControl.tempParam.originalValues.path, paramControl.tempParam.originalValues.operation);

          /*swaggerPaths.updateList = {
            update:true,
            path: paramModal.tempParam.originalValues.path,
            operation: paramModal.tempParam.originalValues.operation,
          }*/

        }catch(e){
            console.log(e);
            //paramControl.toastUser("Parameter name/query combo' already exists");
            Materialize.toast("Parameter name/query combo' already exists", 3000);
        }
      }

      paramModal.setParamInModal = function(inLocation){
        console.log("setting param modal");
        if(inLocation === 'path'){
          paramModal.tempParam.required = true;
          console.log(paramModal.tempParam);
        }

      }

  }]);

swaggerGE.controller("PathController", ['$scope', 'PathService', 'swaggerCompiler', '$window',
  function($scope, swaggerPaths, swaggerCompiler, $window){

     "use strict";

     var vm = this;

    $scope.thisObject = vm;

    //used to test the services
    vm.paths = swaggerPaths.paths;

    vm.prevent = {
      showPaths:false,
    }

    //$scope.closePathModal = false;


  /*  vm.togglePaths = function(){
      //make sure there are paths to show
      if($scope.paths.length > 0)
          $scope.prevent.pathsList = !$scope.prevent.pathsList;
    }*/

    vm.updatePathName = function(originalPathName, newPathName){
      try{
        swaggerPaths.updatePathName(originalPathName, newPathName);
        //delete the old pathName saved on the Object
        //delete vm[originalPathName];
        vm[newPathName]="";
      }catch(e){
        console.log(e);
        Materialize.toast(e, 3000);
      }
    }

    vm.deletePath = function(pathName){
      if($window.confirm('Are you sure you want to delete the path?')){

        try{
          swaggerPaths.removePath(pathName);
        }catch(e){
          console.log(e);
          Materialize.toast(e, 3000);
        }
        //  swaggerPaths.deleteOperation(pathName, operation);

          //delete path.pathDefinition[pathName][operation];

      }else{
          //angular
          console.log('DONT DELETE');
          //path.currentPathOperations[operation] = !path.currentPathOperations[operation];

      }
    }

/**---------  START Operation methods ---------**/

    vm.deleteOperation = function(pathName, operation){
      //if the operation exists delete it

        if($window.confirm('Are you sure you want to delete the ' + operation + ' operation?')){

            swaggerPaths.removeOperation(pathName, operation);

            //delete path.pathDefinition[pathName][operation];

      }else{
        console.log("dont delete operation");
      }
    }

    vm.addOperation = function(pathName, operation){
      try{
        swaggerPaths.addOperation(pathName, operation);
      }catch(e){
        console.log(e);
        Materialize.toast(e, 3000);
      }
    }



}]);

"use strict";
swaggerGE.controller("PathModalController", ["$scope", "PathService",
  function($scope, PathService){

    var vm = this;

    vm.newPath = {
      name:null,
      operations:{
        post:false,
        get:false,
        put:false,
        delete:false,
      }
    }

    vm.prevent = {
      pathCreation: false,
    }

    $scope.closePathModal = false;

    /*
        Add a new path object to the array containing all the paths
    */
    vm.addPath = function(pathName, operation){
      try{
        PathService.addPath(pathName);
      }catch(e){
        console.log(e);
        Materialize.toast('Not a unique name!', 2000);
      }
        for(var operation in vm.newPath.operations){

            if(vm.newPath.operations[operation]){
              console.log("CURRENT OP");
              console.log(operation);
              console.log(vm.newPath.operations);

              try{
                PathService.addOperation(pathName, operation)
              }catch(e){
                console.log(e);
              }
            }

        }


        vm.newPath = {
          name:null,
          operations:{
            post:false,
            get:false,
            put:false,
            delete:false,
          }
        };

        vm.prevent.pathCreation = true;

        $scope.closePathModal = true;

    };


}]);

swaggerGE.controller("responseController",["$scope", "PathService", "ResponseService",
 function($scope, swaggerPaths, responseService){
  "use strict";

  var responseControl = this;

  responseControl.prevent = {
    responseUpdate: false
  }

  responseControl.tempResponse = null;
  responseControl.currentResponse = null;

  responseControl.responseList = {
    post:new Array(),
    get:new Array(),
    put:new Array(),
    delete:new Array(),
  }

  responseControl.newResponseData = {
    post:{
      httpCode:null,
      description:null,
    },
    get:{
      httpCode:null,
      description:null,
    },
    put:{
      httpCode:null,
      description:null,
    },
    delete:{
      httpCode:null,
      description:null,
    },
  }

  responseControl.initResponseData = function(pathName, operation, httpCode){
    console.log("initResponseData");
  }

  responseControl.addResponse = function(path, operation, httpCode, description){
    console.log("addResponse");
    console.log(httpCode);
    console.log(description);
    console.log(responseControl.newResponseData);
    //if(hasResponse(path, operation, httpCode))
    if(hasResponse(operation, httpCode))
      throw "This reposne code already exists"
    else
      responseControl.responseList[operation].push(responseService.newResponse(httpCode, description));

    console.log(responseControl.responseList[operation]);

  }

  function hasResponse(operation, httpCode){
    console.log("Checking response list")
    var exists = false;
    responseControl.responseList[operation].forEach(function(response, index, responseList){
      console.log(response);
      console.log(httpCode);
      console.log("---");
      if(response.code === httpCode){
        console.log("hit");
        exists = true;
        //return;
      }
    });

    return exists;
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
"use strict";
swaggerGE.factory("OperationService", ["ParameterService",
function(ParameterService){

  var Operation = function(){
      this.tags = null;
      this.summary = null;
      this.descripiton = null;
      this.externalDocs = new Object();
      this.operationId = null;
      this.consumes = null;
      this.produces = null;
      this.parameters = ParameterService.newParameters();
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

  function newOperation(){
    return new Operation();
  }

  return {
    newOperation:newOperation,
  }

}]);

swaggerGE.factory("ParameterModalService", [function(){

  var pms = {};


  pms.currentParameter = {
    pathName:null,
    operation:null,
    parameter:null,
  };

  pms.parameterToUpdate = function(pathName, operation, parameter){
    console.log("updaiting parameter");
    console.log(parameter);
    pms.currentParameter.parameter = angular.copy(parameter);
    pms.currentParameter.pathName = pathName;
    pms.currentParameter.operation = operation;

  }

  pms.getCurrentParameter = function(){
    return pms.currentParameter;
  }

  return pms;

}])

swaggerGE.factory("ParameterService", [function(){

  var debug = true;

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
      this.name = name || "";
      this.inLocation = inLocation || "";
      this.description = null;
      this.required = (this.inLocation === "path") ? true : false;
      this.schema = new Object();
      this.type = "";
      this.format ="";
      this.allowEmptyValue = false;
      this.items= new Object();
      this.collectionFormat = "";

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

  /*this.newParam = function(name, id){
    return new newParameter(name, id);
  }*/

  function newParameters(){
    return new Parameters();
  }

  function newParameter(name, inLocation){
    return new Parameter(name, inLocation);
  }

  return {
    newParameters:newParameters,
    newParameter:newParameter
  }

  /*
      Tries to create and validate a new parameter object.

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
          throw "Invalid Parameter Name-in combination, must be unique."
      }
  }


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

  this.updateParameter = function(tempParameter){

    console.log(tempParameter);

    var originalData = tempParameter.originalValues;

    //validate new param
    //check to see if the name - inLocation pair of the parameter was changed
    if(originalData.name !== tempParameter.name || originalData.inLocation !== tempParameter.inLocation){

      console.log("name is not the same or inLocation not the same");
      console.log("\tname: " + originalData.name + ", " + tempParameter.name);
      console.log("\tinLocation: " + originalData.inLocation + ", " + tempParameter.inLocation);
      //if they have been changed check if the new combo is legitamit
      if(!validateParam(originalData.path, originalData.operation, tempParameter.name, tempParameter.inLocation)){
        throw "Invalid Parameter Name-in combination, must be unique."
      }
    }

      console.log("name and inLocation are the same");

      var originalParam = paths[originalData.path][originalData.operation].parameters.getParameter(originalData.name, originalData.inLocation);
      //var newParameter = new Parameter();

      for(var key in tempParameter){
        if(tempParameter.hasOwnProperty(key) && key !== 'originalValues' && key !== "schema"){
          originalParam[key] = tempParameter[key];
        }
        if(key === "schema"){
          if(tempParameter[key] instanceof Object)
            originalParam[key] = tempParameter[key];
          else
            originalParam[key] = JSON.parse(tempParameter[key]);
        }
      }

  }
*/

}])

swaggerGE.service("PathService", ['swaggerCompiler', 'OperationService',
function(swaggerCompiler, OperationService){
    "use strict";

    var self = this;

    var debug = true;

    //var paths = [];

    var paths = {};

/************** PATH FUNCTIONS START *******************/
    var Path = function(){
      this.get = null;
      this.post = null;
      this.put = null;
      this.delete = null;
      /** TODO future attributes
      this.options
      this.head
      this.patch
      this.parameters
      */
    }

    Path.prototype = {
      addOperation: function(operation){
        this[operation] = OperationService.newOperation();
      },

      removeOperation: function(operation){
        delete this[operation];
        this[operation] = null;
      }
    }

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

    this.addPath = function(pathName, operations){
      if(pathExists(pathName)){
        throw "Path name already exsists, could not add"
      }else
        paths[pathName] = new Path();
    };

    this.removePath = function(pathName){
      if(pathExists(pathName))
        delete paths[pathName];
      else
        throw "Not a valid path to delete"

    };

    this.updatePathName = function(oldPathName, newPathName){
      if(oldPathName === newPathName) return;

      if(pathExists(oldPathName)){
        paths[newPathName] = angular.copy(paths[oldPathName]);
        delete paths[oldPathName];
      }else
        throw "Original path name does not exist, could not update name"

    };

    function pathExists(pathName){
      if(paths.hasOwnProperty(pathName))
        return true;
      else
        return false;
    };

/************** PATH FUNCTIONS END*******************/

/************** OPERATION FUNCTIONS START *******************/

    /* make a separate Operations class */
    this.addOperation = function(pathName, operation){

        console.log("PATH SERVICE: adding operation");

        if(pathExists(pathName)){
          paths[pathName][operation] = OperationService.newOperation();
        }else {
          throw "Cannot add Operation, path does not exist"
        }


    }

    /*
        Deletes an operation from a given service.
    */
    this.removeOperation = function(pathName, operation){
      //reset the operation by deleteing it then adding it back as null
        delete paths[pathName][operation];
        paths[pathName][operation]=null;

    }

    this.operationExists = function(pathName, operation){
      if(paths[pathName][operation]){
        return false;
      }else{
        return true;
      }
    }

/************** OPERATION FUNCTIONS END *******************/

/************** PARAMETER(S) FUNCTIONS START *******************/


    /*this.newParam = function(name, id){
      return new newParameter(name, id);
    }*/

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

        }else{
            throw "Invalid Parameter Name-in combination, must be unique."
        }
    }

    /*
        This
    */
    this.getParamList = function(pathName, operation){

        var currentPath = paths[pathName][operation];

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

    this.updateParameter = function(originalParameterData, newParameter){

      console.log(originalParameterData);



      //var originalData = tempParameter.originalValues;

      //validate new param
      //check to see if the name - inLocation pair of the parameter was changed
      if(originalParameterData.parameter.name !== newParameter.name || originalParameterData.parameter.inLocation !== newParameter.inLocation){

        console.log("name is not the same or inLocation not the same");
        console.log("\tname: " + originalParameterData.parameter.name + ", " + newParameter.name);
        console.log("\tinLocation: " + originalParameterData.parameter.inLocation + ", " + newParameter.inLocation);
        //if they have been changed check if the new combo is legitamit
        if(!validateParam(originalParameterData.pathName, originalParameterData.operation, newParameter.name, newParameter.inLocation)){
          throw "Invalid Parameter Name-in combination, must be unique."
        }
      }

        console.log("name and inLocation are the same");

        var originalParam = paths[originalParameterData.pathName][originalParameterData.operation].parameters.getParameter(originalData.name, originalData.inLocation);
        //var newParameter = new Parameter();

        for(var key in newParameter){
          if(newParameter.hasOwnProperty(key) && key !== 'originalValues' && key !== "schema"){
            originalParam[key] = newParameter[key];
          }
          if(key === "schema"){
            if(newParameter[key] instanceof Object)
              originalParam[key] = newParameter[key];
            else
              originalParam[key] = JSON.parse(newParameter[key]);
          }
        }

    }

    this.paths = paths;

    this.chosenParameter= null;

    this.updateChosenParameter = function(newChosen){
      chosenParameter = newChosen;
    };

/************** PARAMETERS FUNCTIONS END*******************/

}]);

swaggerGE.factory("ResponseService",[function(){

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

    /**
      Responses Object
    */
    function Responses(){

      this.responseList = new Array();

    }

    /**
      Responses function
    */
    Responses.prototype = {
      /**

      */
      addResponse: function(httpCode, description){
        this.responseList.push(new Response(httpCode, desctiption));
      },

      /**
      */
      removeResponse: function(httpCode){

        this.responseList.forEach(function(resp, index, responseList){
          if(resp.hasOwnProperty(httpCode)){
            this.responseList.splice(index, 1);
            return;
          }
        });

      },

      /**
      */
      getResponse: function(httpCode){
        var response = null;

        this.responseList.forEach(function(resp, index, responseList){
          if(resp.hasOwnProperty(httpCode)){
            response = resp;
            return;
          }
        });

        return angular.copy(response);

      },

      /**
        Check to see if a response exists in the list
      */
      responseExists: function(httpCode){
        var exists = false;

        this.responseList.forEach(function(response, index, responseList){
          if(response.hasOwnProperty(httpCode)){
            exists = true;
            return;
          }
        });

        return exists;
      },

    };

    /**
      Response Object
    */
    function Response(httpCode, descrip){

      /*
      this[httpCode] = {
        description: descrip,
        schema: new Object(),
        headers: new Object(),
        examples: new Object()
      };*/
      this.code = httpCode
      this.description = descrip,
      this.schema = new Object(),
      this.headers = new Object(),
      this.examples = new Object()
    }

    /**
      Response Functions
    */
    Response.prototype = {};

    return {
      newResponse: function(httpCode, description){
        var response = null;
        var temp = null

        if(!httpCode)
          throw "To create a response code please pass a http code status"
        else if(!description)
          throw "A description is required to create a response"
        else
          return new Response(httpCode, description);

          //response = temp[httpCode];

          //return response;

      },
      hasResponse: function(pathName, operation, httpCode){
        
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
