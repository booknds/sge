import angular from 'angular';
import ResponseEditorComponent from './responseEditor.component';

let ResponseEditorModule = angular.module('ResponseEditorModule', [])
                                .directive('sgResponseEditorModal', ResponseEditorComponent);

export default ResponseEditorModule;
