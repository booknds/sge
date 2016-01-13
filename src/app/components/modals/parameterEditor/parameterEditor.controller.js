let ParameterEditorController = ["$scope", "PathService", "ParameterModalService", ParameterModalCtrl];

export default ParameterEditorController;

function ParameterModalCtrl($scope, swaggerPaths, pms){

  var vm = this;

  this.tempParam = {};
  this.currentParam = {};

  var originalParamData = {
    pathName:null,
    operation:null,
    parameter:null
  };

  this.paramOptions = {
    format : ['int32','int64', 'float', 'double', 'string', 'byte', 'binary', 'boolean', 'date', 'date-time', 'password'],

    type : ['string','number', 'integer', 'boolean', 'array', 'file'],

    collectionFormat : ['csv', 'ssv', 'tsv', 'pipes', 'multi'],
  }


  $scope.$watch(function(){return pms.currentParameter;}, onModalInit.bind(this), true);

  function onModalInit(newVal, oldVal){

    if(newVal.parameter){
      this.currentParam = pms.currentParameter;

      var currentParam = newVal;
      originalParamData.pathName = currentParam.pathName;
      originalParamData.operation = currentParam.operation;
      originalParamData.parameter = currentParam.parameter;

      this.tempParam = angular.copy(currentParam.parameter);

      if(this.tempParam.schema){
        this.tempParam.schema = JSON.stringify(this.tempParam.schema);
      }
    }

  }

  this.updateParameter = function(){
    try{
      swaggerPaths.updateParameter(originalParamData, this.tempParam);

    }catch(e){
        console.log(e);
        Materialize.toast("Parameter name/query combo' already exists", 3000);
    }
  }

  this.setParamInModal = function(inLocation){
    console.log("setting param modal");
    if(inLocation === 'path'){
      this.tempParam.required = true;
      console.log(this.tempParam);
    }

  }

}
