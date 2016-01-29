'use strict';
// import angular from 'angular';
import OperationColorerComponent from './operationColorer.component';

let OperationColorerModule =
    angular.module('OperationColorerModule', [])
            .directive('sgOperationColorer', OperationColorerComponent);

export default OperationColorerModule;
