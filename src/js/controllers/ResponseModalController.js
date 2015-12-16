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
