import angular from 'angular';
import ModalServices from './services/services';
import DefinitionCreator from './definitionCreator/definitionCreator';
import DefinitionEditor from './definitionEditor/definitionEditor';
import PathCreator from './pathCreator/pathCreator';
import ParameterEditor from './parameterEditor/parameterEditor';
import ResponseEditor from './responseEditor/responseEditor';

let ModalsModule =
  angular.module('modals',
    [
      ModalServices.name,
      DefinitionCreator.name,
      DefinitionEditor.name,
      PathCreator.name,
      ParameterEditor.name,
      ResponseEditor.name
    ]);

export default ModalsModule;
