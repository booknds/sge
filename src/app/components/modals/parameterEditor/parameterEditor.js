import angular from 'angular';
import ParameterEditorComponent from './parameterEditor.component';

let ParameterEditorModule = angular.module('ParameterEditorModule', [])
                                .directive('sgParameterEditorModal', ParameterEditorComponent);

export default ParameterEditorModule;
