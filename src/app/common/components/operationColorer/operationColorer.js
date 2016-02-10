"use strict";
import angular from "angular";
import OperationColorerComponent from "./operationColorer.component";

let OperationColorerModule = angular
    .module("OperationColorerModule", [])
    .directive("sgOperationColorerComponent", OperationColorerComponent);

export default OperationColorerModule;
