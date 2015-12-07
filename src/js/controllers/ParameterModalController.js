swaggerGE.controller("ParameterModalController", ["$scope", "swaggerPathsService",
  function($scope, swaggerPaths){

    var paramModal = this;

    paramModal.tempParam = {};

    $scope.$watch(function(){return swaggerPaths.chosenParameter}, function(newVal){
          //$scope.currentParam = newVal;
          //console.log(newVal);
          //console.log($scope.currentParam);
          //paramModal.tempParam = clone($scope.currentParam);
          if(newVal){
            var currentParam = newVal;
            paramModal.tempParam = angular.copy(currentParam);
            paramModal.tempParam.schema = JSON.stringify(paramModal.tempParam.schema);
            console.log("TEMP PARAM");
            console.log(paramModal.tempParam);
          }


      });

      paramModal.updateParameter = function(){
        try{
          console.log("updateParam");
          swaggerPaths.updateParameter(paramModal.tempParam);
          //console.log("poop")
          console.log(paramModal.tempParam.originalValues.path);
          //paramControl.updateParamList(paramControl.tempParam.originalValues.path, paramControl.tempParam.originalValues.operation);

          swaggerPaths.updateList = {
            update:true,
            path: paramModal.tempParam.originalValues.path,
            operation: paramModal.tempParam.originalValues.operation,
          }
        }catch(e){
            console.log(e);
            //paramControl.toastUser("Parameter name/query combo' already exists");
            Materialize.toast("Parameter name/query combo' already exists", 3000);
        }
      }

  }]);
