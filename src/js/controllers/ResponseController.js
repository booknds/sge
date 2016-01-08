(function(){
  "use strict";

  angular
    .module("SwaggerGraphicalEditor")
    .controller("responseController",["$scope", "PathService", "ResponseModalService", ResponseCtrl]);

  function ResponseCtrl($scope, PathService, rms){

   this.prevent = {
     responseUpdate: false
   }

   this.newResponseData = {
     post:{
       httpCode:null,
       description:null,
     },
     get:{
       httpCode:null,
       description:null,
     },
     put:{
       httpCode:null,
       description:null,
     },
     delete:{
       httpCode:null,
       description:null,
     },
   }

   this.initResponseData = function(pathName, operation, httpCode){
     console.log("initResponseData");
     try{
       var currentResponse = PathService.getResponse(pathName, operation, httpCode);
       console.log(currentResponse);
       console.log(httpCode);
       rms.responseToUpdate(pathName, operation, httpCode, currentResponse);
     }catch(e){
       console.log(e);
       Materialize.toast(e, 3000);
       return;
     }



   }

   this.addResponse = function(pathName, operation, httpCode, description){
     console.log("RESPONSE CONTROLLER - ADD RESPONSE");

     try{
       PathService.addResponse(pathName, operation, httpCode, description);
     }catch(e){
       console.log(e);
       Materialize.toast(e, 3000);
     }

     this.newResponseData[operation]= {
       httpCode:null,
       description:null,
     }

   }


  }
})();
