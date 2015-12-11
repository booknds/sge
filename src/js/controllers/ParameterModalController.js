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
