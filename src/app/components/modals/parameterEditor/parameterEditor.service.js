"use strict";

export default ParameterModalService;

function ParameterModalService(){

    this.parameterContext = {
        operation:null,
        parameter:null
    };

    this.initParameter = function(operation, parameter){
        this.parameterContext.operation = operation;
        this.parameterContext.parameter = parameter;
    };

    return this;

}
