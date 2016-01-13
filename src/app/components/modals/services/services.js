import angular from 'angular';
import DefinitionEditorService from './definitionEditor.service';
import ParameterEditorService from './parameterEditor.service';
import ResponseEditorService from './responseEditor.service';

let ModalServiceModule = angular.module('modalServices', [])
                                .factory('DefinitionEditorModalService', DefinitionEditorService)
                                .factory('ParameterModalService', ParameterEditorService)
                                .factory('ResponseModalService', ResponseEditorService);

export default ModalServiceModule;
