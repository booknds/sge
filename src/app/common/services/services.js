import angular from 'angular';
import CompilerService from './compiler.service';
import InfoService from './info.service';
import PathService from './path.service';
import DefinitionsService from './definitions.service';
import OperationService from './operations.service';
import ParameterService from './parameter.service';
import ResponseService from './response.service';

'use strict';

let compilerModule = angular.module("compilerModule", [])
                        .factory('CompilerService', CompilerService)
                        .factory('InfoService', InfoService)
                        .service('PathService', PathService)
                        .factory('DefinitionsService', DefinitionsService)
                        .factory('OperationService', OperationService)
                        .factory('ParameterService', ParameterService)
                        .factory('ResponseService', ResponseService);

export default compilerModule;
