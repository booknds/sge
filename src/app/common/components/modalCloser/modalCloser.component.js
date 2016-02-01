"use strict";

import controller from "./modalCloser.controller";

export default modalCloser;

function modalCloser(){
    return {
        restrict: "A",
        require: "ngModel",
        scope:{},
        bindToController: {
            modalId: "@",
            ngModel: "=?"
        },
        controller,
        controllerAs: "ModalCloserCtrl"
    };
}
