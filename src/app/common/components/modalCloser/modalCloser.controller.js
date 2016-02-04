import angular from "angular";

/**
* This components ensures that an <input> / <label> pair
*   is given a matching unique ID
**/
"use strict";

let ModalCloserController = ["$scope", ModalCloserCtrl];

export default ModalCloserController;

function ModalCloserCtrl($scope){

    $scope.$watch(getModel.bind(this), watchModel.bind(this));

    function watchModel(){

        if(!this.ngModel) return;

        angular.element.find(`#${this.modalId}`).closeModal();
        this.ngModel = false;
    }

    function getModel(){
        return this.ngModel;
    }
}
