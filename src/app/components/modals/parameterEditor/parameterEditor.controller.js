
let ParameterEditorController = ["$scope", "$log", "$mdDialog", ParameterModalCtrl];

export default ParameterEditorController;

function ParameterModalCtrl($scope, $log, $mdDialog){


    // let originalParamContext = {
    //     operation:null,
    //     parameter:null
    // };


    // this.scope = $scope;

    this.paramOptions = {
        format : ["int32","int64", "float", "double", "string", "byte", "binary", "boolean", "date", "date-time", "password"],
        type : ["string","number", "integer", "boolean", "array", "file"],
        collectionFormat : ["csv", "ssv", "tsv", "pipes", "multi"]
    };

    this.locationTypes = ["path", "query", "header", "body", "formData"];

    // $scope.$watch(
    //     function() {
    //         if(this.tempParam) {
    //             return this.tempParam.inLocation;
    //         }
    //     }.bind(this),
    //     function(newVal) {
    //         if (newVal === "path") {
    //             this.tempParam.required = true;
    //         }
    //     }.bind(this));

    // $scope.$watch(function(){return pms.parameterContext;}, onModalInit.bind(this), true);
    //
    // function onModalInit(newVal){
    //
    //     if(newVal.parameter){
    //         // this.currentParam = pms.currentParameter;
    //         //
    //         // var currentParam = newVal;
    //         // originalParamData.pathName = currentParam.pathName;
    //         // originalParamData.operation = currentParam.operation;
    //         // originalParamData.parameter = currentParam.parameter;
    //         //
    //         // this.tempParam = angular.copy(currentParam.parameter);
    //         // this.tempParam.Operation = currentParameter.Operation;
    //         //
    //         // if(this.tempParam.schema){
    //         //   this.tempParam.schema = JSON.stringify(this.tempParam.schema);
    //         // }
    //
    //         //debugger;
    //         originalParamContext = pms.parameterContext;
    //
    //         this.tempParam = angular.copy(originalParamContext.parameter);
    //     }
    //
    // }

    this.updateParameter = function(newParameter){
        // try{
        //     //debugger;
        //     originalParamContext.operation.updateParameter(originalParamContext.parameter, this.tempParam);

        // }catch(e){
        //     $log.log(e);
        //     UtilitiesService.toast("Parameter name/query combo' already exists", 3000);
        // }

        $mdDialog.hide(newParameter);
    };

    this.cancel = function(){
        $mdDialog.cancel();
    };

    // this.setParamInModal = function(inLocation){
    //     //$log.log("setting param modal");
    //     if(inLocation === "path"){
    //         this.tempParam.required = true;
    //         $log.log(this.tempParam);
    //     }
    //
    // };

}
