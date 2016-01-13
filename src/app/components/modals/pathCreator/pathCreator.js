import angular from 'angular';
import PathCreatorComponent from './pathCreator.component';

let PathCreatorModule = angular.module('PathCreatorModule', [])
                                .directive('sgPathCreatorModal', PathCreatorComponent);

export default PathCreatorModule;
