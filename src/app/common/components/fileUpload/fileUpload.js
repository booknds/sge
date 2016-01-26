'use strict';
import angular from 'angular';
import FileUploadComponent from './fileUpload.component';

let FileUploadModule =
    angular.module('FileUploadModule', [])
            .directive('fileChange', FileUploadComponent);

export default FileUploadModule;
