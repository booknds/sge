import angular from "angular";
import OperationComponent from "./operation.component";

"use strict";

let OperationModule = angular
    .module("OperationModule", [])
    .directive("sgOperation", OperationComponent);

export default OperationModule;
