let ResponseController = ["$scope", "PathService", "ResponseModalService", ResponseCtrl];

export default ResponseController;

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

 this.rKeys = null;


 this.initResponseData = function(pathName, operation, httpCode){

   console.log("initResponseData");
   try{
     //var currentResponse = PathService.getResponse(pathName, operation, httpCode);
     let currentResponse = this.sgContext.getResponse(httpCode);
     console.log(currentResponse);
     console.log(httpCode);
     rms.responseToUpdate(httpCode, this.sgContext);
   }catch(e){
     console.log(e);
     Materialize.toast(e, 3000);
     return;
   }
 };

 this.addResponse = function(pathName, operation, httpCode, description){
   console.log("RESPONSE CONTROLLER - ADD RESPONSE");

   try{
     this.sgContext.addResponse(httpCode, description);
     //PathService.addResponse(pathName, operation, httpCode, description);
   }catch(e){
     console.log(e);
     Materialize.toast(e, 3000);
   }

  //  this.newResponseData[operation]= {
  //    httpCode:null,
  //    description:null,
  //  }
  //debugger;
  $scope.addResponse.$setPristine();
  console.log($scope);

   this.rKeys= Object.keys(this.sgContext).length;

 };


}
