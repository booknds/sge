"use strict";

export default ResponseModalService;

function ResponseModalService(){

    this.responseContext = {
        responses:null,
        httpCode:null
    };

    this.responseToUpdate = function initilizer(httpCode, responses){
        // debugger;
        this.responseContext.httpCode = httpCode;
        this.responseContext.responses = responses;
    };

    this.getCurrentParameter = function(){
        return this.currentResponse;
    };

    return this;
}
