import angular from 'angular';
import DefinitionCreatorComponent from './definitionCreator.component';

let DefinitionCreatorModule = angular.module('DefinitionCreatorModule', [])
                                .directive('sgDefinitionCreatorModal', DefinitionCreatorComponent);

export default DefinitionCreatorModule;
