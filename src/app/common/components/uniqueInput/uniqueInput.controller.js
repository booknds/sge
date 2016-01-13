/**
* This components ensures that an <input> / <label> pair
*   is given a matching unique ID 
**/
import angular from 'angular';

let uniqueInputController = ["$scope", uniqueInputCtrl]

export default uniqueInputController;

function uniqueInputCtrl(scope){
  var input = angular.element(document.getElementById('input'));
  input.removeAttr('id');
  input.attr('id', scope.$id);

  var label = angular.element(document.getElementById('label'));
  label.removeAttr('id');
  label.removeAttr('for');
  label.attr('for', scope.$id);
}
