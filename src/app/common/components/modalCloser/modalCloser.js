import angular from "angular";
import ModalCloser from "./modalCloser.component";

let ModalCloserModule = angular
    .module("ModalCloserModule", [])
    .directive("sgModalCloser", ModalCloser);

export default ModalCloserModule;
