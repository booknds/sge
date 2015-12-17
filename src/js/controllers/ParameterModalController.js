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
