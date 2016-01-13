import angular from 'angular';
import MainComponent from './main.component';

  'use strict';

  let mainModule = angular.module("mainModule", [])
                          .directive('sgMain', MainComponent);

export default mainModule;
