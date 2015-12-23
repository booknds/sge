var swaggerGE = angular.module("SwaggerGraphicalEditor", ['ui.materialize']);

/*swaggerGE.directive("pathCreator", ['$compile', function($compile) {
    return {

        link: function(scope, element, attrs){

            element.bind("click", function(){
                angular.element(
                    document.getElementById('addPath'))
                    .append($compile('<info-item  enabled-info="editorEnabled" swagger-base="basicInfo" item="name" disable-edit="disableEditors()" enable-edit="enableEditor(property)"></info-item>')(scope));
		      });

        }
    }
}]);*/

swaggerGE.directive("pathModal",
  function(){
    return{
      restrict: 'E',
      replace:'true',
      templateUrl: 'js/templates/PathModal.tmpl.html',
      controller:'PathModalController',
    }
  });

swaggerGE.directive("parameterModal",
  function(){
    return{
      restrict: 'E',
      replace:'true',
      templateUrl: 'js/templates/ParameterModal.tmpl.html',
      controller:'ParameterModalController',
    }
  });

swaggerGE.directive("responseModal",
  function(){
    return{
      restrict: 'E',
      replace:'true',
      templateUrl: 'js/templates/ResponseModal.tmpl.html',
      controller:'ResponseModalController',
    }
  });

swaggerGE.directive("definitionCreationModal",
  function(){
    return{
      restrict: 'E',
      replace:'true',
      templateUrl: 'js/templates/DefinitionCreationModal.tmpl.html',
      controller:'DefinitionCreationController',
    }
  });

  swaggerGE.directive("definitionEditorModal",
    function(){
      return{
        restrict: 'E',
        replace:'true',
        templateUrl: 'js/templates/DefinitionEditorModal.tmpl.html',
        controller:'DefinitionEditorController',
      }
    });

swaggerGE.directive("focusOnLoad", [
  function(){
    return{
      scope:{ focus: '@focusOnLoad'},
      //controller: "PathController",
      link: function(scope, element, attrs){
        console.log("PATHMODALFOCUS");
        console.log(focus);
        scope.$watch("focus", function(newVal){
          console.log("PATHMODALFOCUS - CHANGED!");
          if(newVal === "true"){
            console.log("PATHMODALFOCUS - TRUE!!");
            element[0].focus();
            //scope.focusPathModal = false;
          }
        })

      },

    }

}]);

swaggerGE.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});

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

swaggerGE.directive("closeDefinitionCreationModal", function(){
    return {
      link: function(scope, element, attrs){
        //console.log(scope);
        scope.$watch('closeModal', function(update){
          if(scope.closeModal === true){
            $('#definition-creation-modal').closeModal();
            scope.closeModal = false;
          }
        });


      }
    }
});

swaggerGE.directive("closeDefinitionEditorModal", function(){
    return {
      link: function(scope, element, attrs){
        //console.log(scope);
        scope.$watch('closeModal', function(update){
          if(scope.closeModal === true){
            $('#definition-editor-modal').closeModal();
            scope.closeModal = false;
          }
        });


      }
    }
});

/*
swaggerGE.directive("colorize", function(){
    return {
      scope: {

      },
      link: function(scope, element, attrs){


          ng-class="{'blue': '{{operation}}' == 'get',
            'orange': '{{operation}}' === 'put',
            'green': '{{operation}}' === 'post',
            'red': '{{operation}}' === 'delete', }"

          //  operation = element.text();

//            if()

            console.log("operation: " + operation);

            switch(operation){

            }

        }
    }
});*/

/*swaggerGE.directive("modalFocus", function(){
    return {
      scope: {

      },
      link: function(scope, element, attrs){

          //attrs.focus

        }
    }
});*/

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

swaggerGE.controller("DefinitionCreationController", ['$scope', 'DefinitionsService',
  function($scope, ds){
    var vm = this;

    $scope.closeModal=false;

    vm.newDefinition = {
      name:null,
    };

    vm.addDefinition = function(definitionName, description){

      try{
        ds.addDefinition(definitionName, description);
      }catch(e){
        console.log(e);
        Materialize.toast(e, 3000);
      }

      $scope.closeModal = true;
      vm.newDefinition.name=null;

    }



  }]);

swaggerGE.controller("DefinitionEditorController", ["$scope", "DefinitionsService", "DefinitionEditorModalService",
  function($scope, ds, dems){

    var vm = this;

    vm.tempDefinition = {
      name:null,
      value:null,
    };
    vm.originalDefinition = null;

    vm.newProperty = {
      name: null,
    };

    vm.formats = ['int32','int64', 'float', 'double', 'string', 'byte', 'binary', 'boolean', 'date', 'date-time', 'password', 'email', 'uuid'];
    vm.types = ['integer', 'number', 'string', 'boolean'];

    vm.toast = function(msg){
      var message = msg || "No toast supplied, but hello!!";
      Materialize.toast(msg, 2000);
    }

    vm.addProperty = function(definitionName, propertyName){

      try{
        ds.addProperty(definitionName, propertyName);
      }catch(e){
          console.log(e);
          Materialize.toast(e, 3000);
      }

      //if(tempDefniition.value.properties.hasOwnProperty)

      vm.newProperty.name = "";

    }

    vm.togglePropertyRequired = function(propertyName, isRequired){
      console.log("TOGGLE PROPERTY REQUIRED");
      console.log(propertyName, isRequired);
      if(isRequired){
        vm.tempDefinition.value.required.push(propertyName);
      }else{
        for(var i = 0; i < vm.tempDefinition.value.required.length; i++){
          if(vm.tempDefinition.value.required[i] === propertyName){
            vm.tempDefinition.value.required.splice(i, 1);
            return;
          }

        }
      }
    }

    $scope.$watch(function(){return dems.currentDefinition;}, function(newVal){

        if(newVal.name){
          console.log("hit current definition updated");
          var currentDefinition = newVal;
          vm.originalDefinition = currentDefinition;

          vm.tempDefinition.name = vm.originalDefinition.name;
          vm.tempDefinition.value = angular.copy(vm.originalDefinition.value) ;
        }

      }, true);

}])

swaggerGE.controller("DefinitionsController", ["$scope", "DefinitionsService", "DefinitionEditorModalService",
  function($scope, ds, dems){

    var vm = this;

    vm.definitions = ds.definitions;

    $scope.$watch(function(){return ds.definitions;}, function(newVal){
      console.log("DEFINITIONS HIT");
      if(newVal){
        console.log(newVal);
        console.log("DEFINITIONS CHANGED");
        vm.definitions = ds.definitions;
      }
    }, true);

    vm.headers = ['Name', 'Description', 'Type', 'Required', 'Enum'];
    vm.Types = ['int32','int64', 'float', 'double', 'string', 'byte', 'binary', 'boolean', 'date', 'date-time', 'password'];

    vm.showDefinitionProperty = function show(def, prop){
      var allowedProperties = ['name', 'description', 'type', 'required', 'enum'];

      console.log(def, prop);

      var show = false;

      if(!def[prop]){
        for(var i = 0; i < allowedProperties.length; i++){
          if(prop === allowedProperties)
            show = true;
        }
      }

      console.log("returning " + show);
      return show;
    }

    vm.initDefinitionEditorModal = function(definitionName, definitionValue){
      console.log("initDefinitionEditorModal");
      try{
        //var currentResponse = PathService.getResponse(pathName, operation, httpCode);
        console.log(definitionName);
        console.log(definitionValue);
        dems.definitionToUpdate(definitionName, definitionValue);
      }catch(e){
        console.log(e);
        Materialize.toast(e, 3000);
        return;
      }
    }

}])

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

    var paramControl = this;

    //paramControl.am = {};

    paramControl.path = {
      name: null,
      operation: null,
    }

    paramControl.parametersList = null;

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

    //Param methods
    this.addParam = function(pathName, operation, paramName, paramInLocation){

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


}]);

swaggerGE.controller("ParameterModalController", ["$scope", "PathService", "ParameterModalService",
  function($scope, swaggerPaths, pms){

    var paramModal = this;

    paramModal.tempParam = {};
    var originalParamData = {
      pathName:null,
      operation:null,
      parameter:null
    };

    paramModal.paramOptions = {
      format : ['int32','int64', 'float', 'double', 'string', 'byte', 'binary', 'boolean', 'date', 'date-time', 'password'],

      type : ['string','number', 'integer', 'boolean', 'array', 'file'],

      collectionFormat : ['csv', 'ssv', 'tsv', 'pipes', 'multi'],
    }


    $scope.$watch(function(){return pms.currentParameter;}, function(newVal){

        if(newVal.parameter){

          var currentParam = newVal;
          originalParamData.pathName = currentParam.pathName;
          originalParamData.operation = currentParam.operation;
          originalParamData.parameter = currentParam.parameter;

          paramModal.tempParam = angular.copy(currentParam.parameter);

          if(paramModal.tempParam.schema){
            paramModal.tempParam.schema = JSON.stringify(paramModal.tempParam.schema);
          }

        }

      }, true);

      paramModal.updateParameter = function(){
        try{
          swaggerPaths.updateParameter(originalParamData, paramModal.tempParam);

        }catch(e){
            console.log(e);
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

    //$scope.thisObject = vm;

    //used to test the services
    vm.paths = swaggerPaths.paths;

    vm.prevent = {
      showPaths:false,
    }

    vm.focusPathModal = false;

    //$scope.closePathModal = false;


  /*  vm.togglePaths = function(){
      //make sure there are paths to show
      if($scope.paths.length > 0)
          $scope.prevent.pathsList = !$scope.prevent.pathsList;
    }*/
    vm.focusPathModal = function(){
      $scope.focusPathModal = !$scope.focusPathModal;
    }

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
    };

    vm.addOperation = function(pathName, operation){
      try{
        swaggerPaths.addOperation(pathName, operation);
      }catch(e){
        console.log(e);
        Materialize.toast(e, 3000);
      }
    };

    vm.updateOperation = function(pathName, operation, key, value){
      swaggerPaths.updateOperationInformation(pathName, operation, key, value);
      value="";
      Materialize.toast("Updated " + key, 2000);
    };



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

swaggerGE.controller("responseController",["$scope", "PathService", "ResponseModalService",
 function($scope, PathService, rms){
  "use strict";

  var responseControl = this;

  responseControl.prevent = {
    responseUpdate: false
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
    try{
      var currentResponse = PathService.getResponse(pathName, operation, httpCode);
      console.log(currentResponse);
      console.log(httpCode);
      rms.responseToUpdate(pathName, operation, httpCode, currentResponse);
    }catch(e){
      console.log(e);
      Materialize.toast(e, 3000);
      return;
    }



  }

  responseControl.addResponse = function(pathName, operation, httpCode, description){
    console.log("RESPONSE CONTROLLER - ADD RESPONSE");

    try{
      PathService.addResponse(pathName, operation, httpCode, description);
    }catch(e){
      console.log(e);
      Materialize.toast(e, 3000);
    }

    responseControl.newResponseData[operation]= {
      httpCode:null,
      description:null,
    }

  }


}]);

swaggerGE.controller("ResponseModalController", ["ResponseModalService", "PathService", "$scope",
  function(rms, PathService, $scope){

    var vm = this;

    vm.tempResponseData = {
      httpCode:null,
      response:null,
    };
    var originalResponseData = {
      pathName:null,
      operation:null,
      httpCode:null,
      response:null,
    };

    $scope.$watch(function(){return rms.currentResponse;}, function(newVal){

        if(newVal.response){
          console.log("hit current response updated");
          var currentResponse = newVal;
          vm.originalResponseData = currentResponse;

          vm.tempResponseData.response = angular.copy(currentResponse.response);
          vm.tempResponseData.httpCode = vm.originalResponseData.httpCode;

          if(vm.tempResponseData.response.schema instanceof Object){
            vm.tempResponseData.response.schema = JSON.stringify(vm.tempResponseData.response.schema);
          }
          if(vm.tempResponseData.response.headers instanceof Object){
            vm.tempResponseData.response.headers = JSON.stringify(vm.tempResponseData.response.headers);
          }
          if(vm.tempResponseData.response.examples instanceof Object){
            vm.tempResponseData.response.examples = JSON.stringify(vm.tempResponseData.response.examples);
          }

        }

      }, true);

      vm.updateResponse = function(originalResponse, newResponse){
        try{
          //swaggerPaths.updateParameter(originalParamData, paramModal.tempParam);
          PathService.updateResponse(originalResponse, newResponse);
        }catch(e){
            console.log(e);
            Materialize.toast("Parameter name/query combo' already exists", 3000);
        }
      }

      vm.setParamInModal = function(inLocation){
        console.log("setting param modal");
        if(inLocation === 'path'){
          vm.tempResponse.required = true;
          console.log(vm.tempResponse);
        }

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
swaggerGE.factory("DefinitionEditorModalService", [
  function(){
    var dems = this;

    dems.currentDefinition = {
      name:null,
      value:null,
    };

    dems.definitionToUpdate = function(definitionName, definitionValue){
      //console.log("updaiting parameter");
      //console.log(parameter);

      //rms.currentResponse.pathName = pathName;
      //rms.currentResponse.operation = operation;
      //rms.currentResponse.httpCode = httpCode;
      //rms.currentResponse.response = angular.copy(response);
      dems.currentDefinition.name = definitionName;
      dems.currentDefinition.value = definitionValue;
      console.log("updated current definition");
      console.log(dems.currentDefinition);
      //console.log(pms.currentParameter);
      //console.log("Done updating parameter");
    }

    dems.getCurrentDefinition = function(){
      return dems.currentDefinition;
    }

    return dems;


}]);

swaggerGE.factory("DefinitionsService", [function(){

  var ds = this;

  function Schema(title, description, type){
    this.$ref = null;
    this.format = null;
    this.title = title || "";
    this.description = description || "";
    this.required = new Array();
    this.enum = null;
    this.type = type || "Object";
    this.properties = {};
  }

  Schema.prototype = {};

  function Definitions(){
    //this[objectName] = new Schema();

    //return this[objectName];
    //return new Object();
    //this.poop = "poop";
  }

  Definitions.prototype = {

    addDefinition:function(definitionName, description, type){
      this[definitionName] = new Schema(definitionName, description, type);
    },

    hasDefinition: function(definitionName){
      if(this.hasOwnProperty(definitionName))
        return true;
      else
        return false;
    },

    getDefinition: function(definitionName){
      return this[definitionName];
    },
  }


  ds.addDefinition = function(definitionName, description, type){
    if(hasDefinition(definitionName))
      throw "Cannot Add, Definition Already Exists"
    else{
      console.log('adding definitiion');
      //definitions[definitionName] = {
      //  poop:'hi'
      //}
      ds.definitions.addDefinition(definitionName, description, type);
      console.log(definitions);
      console.log(ds.definitions);
    }
  }

  function hasDefinition(definitionName){
    if(definitions.hasOwnProperty(definitionName))
      return true;
    else
      return false;
  }

  ds.addProperty = function(definitionName, propertyName){

    console.log("DS add property");
    console.log(definitionName, propertyName);

    if(hasProperty(definitionName, propertyName)){
      throw "Property '" + propertyName + "' already exists in definition: " + definitionName;

    }else {
        definitions[definitionName].properties[propertyName] = new Schema();
        definitions[definitionName].properties[propertyName].type = null;
    }

  };

  function hasProperty(definitionName, propertyName){
    console.log("HAS PROPERTY");
    console.log(definitionName, propertyName);
    if(definitions[definitionName].properties.hasOwnProperty(propertyName))
      return true;
    else
      return false;
  }

  var definitions = new Definitions();

  ds.definitions = definitions;
  console.log(definitions);

  return ds;

}]);

"use strict";
swaggerGE.factory("OperationService", ["ParameterService", "ResponseService",
function(ParameterService, ResponseService){

  var Operation = function(){
      this.tags = null;
      this.summary = null;
      this.descripiton = null;
      this.externalDocs = new Object();
      this.operationId = null;
      this.consumes = null;
      this.produces = null;
      this.parameters = ParameterService.newParameters();
      this.responses = ResponseService.newResponses();
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
    //console.log("updaiting parameter");
    //console.log(parameter);

    pms.currentParameter.pathName = pathName;
    pms.currentParameter.operation = operation;
    pms.currentParameter.parameter = angular.copy(parameter);

    //console.log(pms.currentParameter);
    //console.log("Done updating parameter");
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

    self.paths = paths;

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

    self.setPaths= function(newPaths){
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

    self.addPath = function(pathName, operations){
      if(pathExists(pathName)){
        throw "Path name already exsists, could not add"
      }else
        paths[pathName] = new Path();
    };

    self.removePath = function(pathName){
      if(pathExists(pathName))
        delete paths[pathName];
      else
        throw "Not a valid path to delete"

    };

    self.updatePathName = function(oldPathName, newPathName){
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
    self.addOperation = function(pathName, operation){

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
    self.removeOperation = function(pathName, operation){
      //reset the operation by deleteing it then adding it back as null
        delete paths[pathName][operation];
        paths[pathName][operation]=null;

    }

    self.operationExists = function(pathName, operation){
      if(paths[pathName][operation]){
        return false;
      }else{
        return true;
      }
    }

    self.updateOperationInformation = function(pathName, operation, key, value){
      paths[pathName][operation][key] = value;
    }

/************** OPERATION FUNCTIONS END *******************/

/************** PARAMETER(S) FUNCTIONS START *******************/

    /*
        Tries to create and validate a new parameter object.
    */
    self.addNewParam = function(pathName, operation, paramName, paramIn){
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
    self.getParamList = function(pathName, operation){

        var currentPath = paths[pathName][operation];

        return currentPath.parameters.getParameterList();

    }

    /*

    */
    self.getParam = function(pathName, operation, paramName, paramIn){
        console.log("------------------\nGETTING PARAM NAME");
        console.log(pathName + ", " + operation + ", " + paramName + ", " + paramIn);
        var paramObject = paths[pathName][operation].parameters.getParameter(paramName, paramIn);
        console.log(paramObject);
        console.log("------------------");
        return paramObject;
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

    /**
     *
     */
    self.updateParameter = function(originalParameterData, newParameter){
      if(debug){
        console.log("START Swagger Paths -> updating the Parameter Model");
        //console.log(originalParameterData);
      }

      var pathName = originalParameterData.pathName;
      var operation = originalParameterData.operation;

      var oParamName = originalParameterData.parameter.name;
      var oParamIn = originalParameterData.parameter.inLocation;

      var newParamName = newParameter.name;
      var newParamIn = newParameter.inLocation;


      //validate new param
      //check to see if the name - inLocation pair of the parameter was changed
      if(oParamName !== newParamName || oParamIn !== newParamIn){

        //if they have been changed check if the new combo is unique
        if(!validateParam(pathName, operation, newParamName, newParamIn)){
          throw "Invalid Parameter Name-in combination, must be unique."
        }
      }

        //set a reference to the actual parameter so to later manipulate
        var originalParam = self.getParam(pathName, operation, oParamName, oParamIn);

        //update the original parameter with the new parameter's data
        for(var key in newParameter){
          if(newParameter.hasOwnProperty(key) && key !== "schema"){
            originalParam[key] = newParameter[key];
          }
          //handle schema as a special case;
          if(key === "schema"){
            //if the schema was updated, convert the JSON to an object
            if(newParameter[key] instanceof Object)
              originalParam[key] = newParameter[key];
            else
              originalParam[key] = JSON.parse(newParameter[key]);
          }
        }

        if(debug){
          console.log("FINISHED Swagger Paths -> updating the Parameter Model");
          //console.log(originalParameterData);
        }

    }

/************** PARAMETERS FUNCTIONS END*******************/

/************** RESPONSE FUNCTIONS START*******************/
  self.addResponse = function(pathName, operation, httpCode, description){
    if(debug){
      console.log("ADD RESPONSE - START");
    }

    if(!description){
      throw "Description needs to be filled out"
    }

    var path = paths[pathName][operation];

    if(hasResponse(pathName, operation, httpCode)){
      throw "Http Code already exists"
    }else{
      path.responses.addResponse(httpCode, description);
    }

    if(debug){
      console.log("ADD RESPONSE - END");
    }
  }

  self.getResponse = function(pathName, operation, httpCode){

    console.log(pathName + ", " + operation + ", " + httpCode);
    var response = paths[pathName][operation].responses.getResponse(httpCode);
    if(response){
      return response;
    }else {
      throw "The Response Code could not be found"
    }
  }

  self.removeResponse = function (pathName, operation, httpCode){
    delete paths[pathName][operation].responses[httpCode];
  }

  self.updateResponse = function(originalResponseData, newResponse){
    if(debug){
      console.log("START Swagger Paths -> updating the Response Model");
      //console.log(originalParameterData);
    }
    console.log(originalResponseData);
    console.log(newResponse);
    var pathName = originalResponseData.pathName;
    var operation = originalResponseData.operation;

    var oHttpCode = originalResponseData.httpCode;
    var newHttpCode = newResponse.httpCode;

    if(oHttpCode !== newHttpCode){

      //if they have been changed check if the new combo is unique
      if(hasResponse(pathName, operation, newHttpCode)){
        throw "Invalid Parameter Name-in combination, must be unique."
      }else{
        self.removeResponse(pathName, operation, oHttpCode);

        self.addResponse(pathName, operation, newHttpCode, newResponse.response.description);
        var newlyAddedResponse = self.getResponse(pathName, operation, newHttpCode);

        for(var key in newlyAddedResponse){
          if(key !== 'description'){
            if(newlyAddedResponse[key] instanceof Object)
              newlyAddedResponse[key] = newResponse.response[key];
            else
              newlyAddedResponse[key] = JSON.parse(newResponse.response[key]);
          }
        }
      }

    }else{

      var originalResponse = self.getResponse(pathName, operation, oHttpCode);
      console.log("Httpcodes match");
      console.log(originalResponse);

      for(var key in originalResponse){

          if(originalResponse[key] instanceof Object || key === 'description')
            originalResponse[key] = newResponse.response[key];
          else
            originalResponse[key] = JSON.parse(newResponse.response[key]);

      }
    }


      if(debug){
        console.log("FINISHED Swagger Paths -> updating the Parameter Model");
        //console.log(originalParameterData);
      }

  };

  function hasResponse(pathName, operation, httpCode){
    if(debug){
      console.log("HAS RESPONSE - START");
    }

    var path = paths[pathName][operation];

    if(path.responses.responseExists(httpCode)){
        if(debug)
            console.log("\t Same Response found");

        return true;
    }else{
        if(debug)
            console.log("\t Response NOT found");

        return false;
    }

    if(debug){
      console.log("HAS RESPONSE - END");
    }
  }
/************** RESPONSE FUNCTIONS END*******************/
}]);

swaggerGE.factory("ResponseModalService", [
  function(){
    var rms = this;

    rms.currentResponse = {
      pathName:null,
      operation:null,
      httpCode:null,
      response:null,
    };

    rms.responseToUpdate = function(pathName, operation, httpCode, response){
      //console.log("updaiting parameter");
      //console.log(parameter);

      rms.currentResponse.pathName = pathName;
      rms.currentResponse.operation = operation;
      rms.currentResponse.httpCode = httpCode;
      rms.currentResponse.response = angular.copy(response);
      console.log("updated current response");
      console.log(rms.currentResponse);
      //console.log(pms.currentParameter);
      //console.log("Done updating parameter");
    }

    rms.getCurrentParameter = function(){
      return rms.currentResponse;
    }

    return rms;


}]);

swaggerGE.factory("ResponseService",[function(){

  var rs = this;

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

      //this.responseList = new Object();

    }

    /**
      Responses function
    */
    Responses.prototype = {
      /**

      */
      addResponse: function(httpCode, description){
        console.log(this.responseList);

        this[httpCode] = new Response(description);

        console.log(this.responseList);


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
        /*var response = null;

        this.responseList.forEach(function(resp, index, responseList){
          if(resp.hasOwnProperty(httpCode)){
            response = resp;
            return;
          }
        });

        return angular.copy(response);*/
        if(this.hasOwnProperty(httpCode))
          return this[httpCode];
        else
          return null;

      },

      /**
        Check to see if a response exists in the list
      */
      responseExists: function(httpCode){
        //var exists = false;

        //this.responseList.forEach(function(response, index, responseList){
        console.log("RESPONSE EXISTS FUNCTION");
        console.log(httpCode);
        console.log(this.responseList);
          if(this.hasOwnProperty(httpCode)){
            return true;
            //return;
          }else {
            return false;
          }
        //});

        //return exists;
      },

    };

    /**
      Response Object
    */
    function Response(descrip){

      this.description = descrip,
      this.schema = new Object(),
      this.headers = new Object(),
      this.examples = new Object()

      //return this[httpCode];
    }

    /**
      Response Functions
    */
    Response.prototype = {};

    return {
      newResponses:function(){
        return new Responses();
      },

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
