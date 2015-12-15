swaggerGE.controller("ResponseModalController", ["ResponseModalService", "$scope",
  function(rms, $scope){

    var vm = this;

    vm.tempResponse = {};
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

          vm.tempResponse = angular.copy(currentResponse.response);
          vm.tempResponse.httpCode = vm.originalResponseData.httpCode;

          if(vm.tempResponse.schema){
            vm.tempResponse.schema = JSON.stringify(vm.tempResponse.schema);
          }
          if(vm.tempResponse.headers){
            vm.tempResponse.headers = JSON.stringify(vm.tempResponse.headers);
          }
          if(vm.tempResponse.examples){
            vm.tempResponse.examples = JSON.stringify(vm.tempResponse.examples);
          }

        }

      }, true);

      vm.updateParameter = function(){
        try{
          //swaggerPaths.updateParameter(originalParamData, paramModal.tempParam);

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
