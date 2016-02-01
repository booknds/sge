"use strict";
import angular from "angular";
import FileUploadComponent from "./fileUpload.component";

let FileUploadModule = angular
    .module("FileUploadModule", [])
    .directive("customOnChange", FileUploadComponent);

export default FileUploadModule;
