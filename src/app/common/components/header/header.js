import angular from "angular";
import headerComponent from "./header.component";
//import angular_materialize from "angular-materialize";
//import Blob from "blob-polyfill";
//import FileSaver from "filesaver.js";
//import angularFileSaver from "angular-file-saver";
//import "materialize-css/dist/js/materialize.js";

"use strict";

let headerModule = angular
    .module("header",[])
    .directive("sgHeader", headerComponent);

export default headerModule;
