/**
* This components ensures that an <input> / <label> pair
*   is given a matching unique ID
**/
import angular from 'angular';

let ModalCloserController = ['$scope', ModalCloserCtrl]

export default ModalCloserController;

function ModalCloserCtrl($scope){

  $scope.$watch(getModel.bind(this), watchModel.bind(this));

  function watchModel(model){

    if(!this.ngModel) return;

    $(`#${this.modalId}`).closeModal();
    this.ngModel = false;
  }

  function getModel(){
    return this.ngModel;
  }
}
