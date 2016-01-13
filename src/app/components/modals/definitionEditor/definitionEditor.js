import angular from 'angular';
import DefinitionEditorComponent from './definitionEditor.component';

let DefinitionEditorModule = angular.module('DefinitionEditorModule', [])
                                .directive('sgDefinitionEditorModal', DefinitionEditorComponent);

export default DefinitionEditorModule;
