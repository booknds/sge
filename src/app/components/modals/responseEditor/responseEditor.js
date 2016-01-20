import angular from 'angular';
import ResponseEditorComponent from './responseEditor.component';
import ResponseEditorService from './responseEditor.service';

let ResponseEditorModule = angular.module('ResponseEditorModule', [])
                                .directive('sgResponseEditorModal', ResponseEditorComponent)
                                .factory('ResponseModalService', ResponseEditorService);

export default ResponseEditorModule;
