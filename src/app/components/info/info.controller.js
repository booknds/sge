import angular from 'angular';
//import main from './main.js';

"use strict";

let infoCtrl = ['$scope', '$log', 'InfoService', SwaggerBaseCtrl];

export default infoCtrl;

function SwaggerBaseCtrl($scope, $log, swaggerBaseService){
  //display functionality
  $scope.preventUpdate = true;

  this.info = swaggerBaseService.swaggerInfo;

  //get the basic info.
  $scope.basicInfo = swaggerBaseService.newBaseInfo();

  //used to test the base info singleton
  $scope.service = null;

  $scope.mimeTypes = ['text/plain; charset=utf-8', 'application/json', 'application/vnd.github+json',
                      'application/vnd.github.v3+json', 'application/vnd.github.v3.raw+json',
                      'application/vnd.github.v3.text+json', 'application/vnd.github.v3.html+json',
                      'application/vnd.github.v3.full+json', 'application/vnd.github.v3.diff',
                      'application/vnd.github.v3.patch'];


  $scope.schemeTypes = ['http', 'https', 'ws', 'wws'];

  $scope.extraInfo ={
      schemes: new Array(),
      produces: new Array(),
      consumes: new Array(),
  };


  $scope.updateInfo = function(){
      swaggerBaseService.setSwaggerInfo($scope.basicInfo);
      $scope.service = swaggerBaseService.getSwaggerInfo();
  };

  $scope.addConsumeType = function(mimeType){
      if(mimeType){
          if($scope.basicInfo.consumes.indexOf(mimeType) === -1){
              $scope.basicInfo.consumes.push(mimeType);

              //remove from the list of available mime type options
              //removeMimeType(mimeType);
          }else {
              //prompt the user that it has already been added.
              Materialize.toast("mimeType already added", 3000);
          }
      }else {
          Materialize.toast("Choose a mime type!", 3000);
      }

  }

  $scope.addProduceType = function(mimeType){
      if(mimeType){
          if($scope.basicInfo.produces.indexOf(mimeType) === -1){
              $scope.basicInfo.produces.push(mimeType);

          }else {
              //prompt the user that it has already been added.
              Materialize.toast("mimeType already added", 3000);
          }
      }else {
          Materialize.toast("Choose a mime type!", 3000);
      }
  }

  $scope.addSchemeType = function(schemeType){
      if(schemeType){
          if($scope.basicInfo.schemes.indexOf(schemeType) === -1){
              $scope.basicInfo.schemes.push(schemeType);

          }else {
              //prompt the user that it has already been added.
              Materialize.toast("scheme type already added", 3000);
          }
      }else {
          Materialize.toast("Choose a scheme type!", 3000);
      }
  }

  $scope.removeConsumeType = function(mimeType){
      var index = $scope.basicInfo.consumes.indexOf(mimeType);
      if(index >= 0)
          $scope.basicInfo.consumes.splice(index, 1);
      else
          Materialize.toast("mime type already deleted", 3000);
  }

  $scope.removeProduceType = function(mimeType){
      var index = $scope.basicInfo.produces.indexOf(mimeType);

      console.log($scope.basicInfo.produces);
      if(index >= 0)
          $scope.basicInfo.produces.splice(index, 1);
      else
          Materialize.toast("mime type already deleted", 3000);

  }

  $scope.removeSchemeType = function(schemeType){
      var index = $scope.basicInfo.schemes.indexOf(schemeType);
      if(index >= 0)
          $scope.basicInfo.schemes.splice(index, 1);
      else
          Materialize.toast("scheme type already deleted", 3000);
  }




}
