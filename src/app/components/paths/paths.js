import angular from 'angular';
import PathComponent from './paths.component';

'use strict';

let pathModule = angular.module("pathModule", [])
                        .directive('sgPath', PathComponent);

export default pathModule;
