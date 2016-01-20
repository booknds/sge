let ResponseEditorController = ["ResponseModalService", "PathService", "$scope", ResponseModalCtrl];

export default ResponseEditorController;

function ResponseModalCtrl(rms, PathService, $scope){

  this.tempResponse = {
    httpCode:null,
    response:null,
  };

  // var originalResponseData = {
  //   pathName:null,
  //   operation:null,
  //   httpCode:null,
  //   response:null,
  // };

  let originalResponse = {
    responses:null,
    httpCode:null
  }

  $scope.$watch(function(){return rms.responseContext;}, onModalInit.bind(this), true);

  function onModalInit(newVal){

    if(newVal.responses){
      // console.log("hit current response updated");
      // var currentResponse = newVal;
      // this.originalResponseData = currentResponse;
      //
      // this.tempResponseData.response = angular.copy(currentResponse.response);
      // this.tempResponseData.httpCode = this.originalResponseData.httpCode;
      //
      // if(this.tempResponseData.response.schema instanceof Object){
      //   this.tempResponseData.response.schema = JSON.stringify(this.tempResponseData.response.schema);
      // }
      // if(this.tempResponseData.response.headers instanceof Object){
      //   this.tempResponseData.response.headers = JSON.stringify(this.tempResponseData.response.headers);
      // }
      // if(this.tempResponseData.response.examples instanceof Object){
      //   this.tempResponseData.response.examples = JSON.stringify(this.tempResponseData.response.examples);
      // }
      debugger;
      originalResponse = newVal;
      this.tempResponse.httpCode = angular.copy(newValue.httpCode);
      this.tempResponse.response = angular.copy(newVal.getResponse(httpcode));
    }

  }

  this.updateResponse = function(originalResponse, newResponse){
    try{
      //swaggerPaths.updateParameter(originalParamData, paramModal.tempParam);
      PathService.updateResponse(originalResponse, newResponse);
    }catch(e){
        console.log(e);
        Materialize.toast("Parameter name/query combo' already exists", 3000);
    }
  }

  this.setResponseInModal = function(inLocation){
    console.log("setting response modal");
    if(inLocation === 'path'){
      this.tempResponse.required = true;
      console.log(this.tempResponse);
    }

  }

}
