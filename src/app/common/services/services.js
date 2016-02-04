"use strict";

import angular from "angular";
import CompilerService from "./compiler.service";
import InfoService from "./info.service";
import PathService from "./path.service";
import DefinitionsService from "./definitions.service";
import ObjectFactory from "./objectFactory.service";
import UtilitiesService from "./util.service.js";

let compilerModule = angular.module("compilerModule", [])
                        .factory("CompilerService", CompilerService)
                        .factory("InfoService", InfoService)
                        .factory("PathService", PathService)
                        .factory("DefinitionsService", DefinitionsService)
                        .factory("ObjectFactory", ObjectFactory)
                        .factory("UtilitiesService", UtilitiesService);

export default compilerModule;
