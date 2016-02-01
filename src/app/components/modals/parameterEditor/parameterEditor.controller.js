let ParameterEditorController = ["$scope", "$log", "PathService", "ParameterModalService", ParameterModalCtrl];

export default ParameterEditorController;

function ParameterModalCtrl($scope, $log, swaggerPaths, pms){

    this.tempParam = {};
    //this.currentParam = {};

    let originalParamContext = {
        operation:null,
        parameter:null
    };

    this.paramOptions = {
        format : ["int32","int64", "float", "double", "string", "byte", "binary", "boolean", "date", "date-time", "password"],
        type : ["string","number", "integer", "boolean", "array", "file"],
        collectionFormat : ["csv", "ssv", "tsv", "pipes", "multi"]
    };

    $scope.$watch(function(){return pms.parameterContext;}, onModalInit.bind(this), true);

    function onModalInit(newVal){

        if(newVal.parameter){
            // this.currentParam = pms.currentParameter;
            //
            // var currentParam = newVal;
            // originalParamData.pathName = currentParam.pathName;
            // originalParamData.operation = currentParam.operation;
            // originalParamData.parameter = currentParam.parameter;
            //
            // this.tempParam = angular.copy(currentParam.parameter);
            // this.tempParam.Operation = currentParameter.Operation;
            //
            // if(this.tempParam.schema){
            //   this.tempParam.schema = JSON.stringify(this.tempParam.schema);
            // }

            //debugger;
            originalParamContext = pms.parameterContext;

            this.tempParam = angular.copy(originalParamContext.parameter);
        }

    }

    this.updateParameter = function(){
        try{
            //debugger;
            originalParamContext.operation.updateParameter(originalParamContext.parameter, this.tempParam);

        }catch(e){
            $log.log(e);
            Materialize.toast("Parameter name/query combo' already exists", 3000);
        }
    };

    this.setParamInModal = function(inLocation){
        //$log.log("setting param modal");
        if(inLocation === "path"){
            this.tempParam.required = true;
            $log.log(this.tempParam);
        }

    };

}
