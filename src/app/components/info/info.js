import angular from 'angular';
import InfoComponent from './info.component';

'use strict';

let infoModule = angular.module("infoModule", [])
                        .directive('sgInfo', InfoComponent);

export default infoModule;
