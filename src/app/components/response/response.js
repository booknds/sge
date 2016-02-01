import angular from "angular";
import ResponseComponent from "./response.component";

"use strict";

let ResponseModule = angular
    .module("ResponseModule", [])
    .directive("sgResponse", ResponseComponent);

export default ResponseModule;
