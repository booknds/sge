import angular from 'angular';
import angularMaterialize from 'angular-materialize';
import DefinitionsComponent from './definitions.component';

'use strict';

let DefinitionsModule = angular.module('definitionsModule', ['ui.materialize'])
                                .directive('sgDefinitions', DefinitionsComponent);

export default DefinitionsModule;
