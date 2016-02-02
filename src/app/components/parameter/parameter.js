import angular from "angular";
import ParameterComponent from "./parameter.component";
        
"use strict";

let ParameterModule = angular
    .module("ParameterModule", [])
    .directive("sgParameter", ParameterComponent);

export default ParameterModule;
