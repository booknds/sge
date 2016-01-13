/**
* This components ensures that an <input> / <label> pair
*   is given a matching unique ID
**/
import angular from 'angular';

let ModalCloserController = ["$scope", ModalCloserCtrl]

export default ModalCloserController;

function ModalCloserCtrl($scope){

  $scope.$watch('ngModel', function(update){

      if(!$scope.ngModel) return;

      $(`#${$scope.modalId}`).closeModal();

      $scope.ngModel = false;
    }
  );
}
