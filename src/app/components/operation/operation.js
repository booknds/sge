"use strict";
// import angular from "angular";
import OperationComponent from "./operation.component";

let OperationModule = angular
    .module("OperationModule", [])
    .directive("sgOperation", OperationComponent);

export default OperationModule;
