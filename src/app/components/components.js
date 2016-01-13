import angular from 'angular';
import Main from './main/main';
import Modals from './modals/modals';
import Info from './info/info';
import Paths from './paths/paths';
import Parameter from './parameter/parameter';
import Response from './response/response';
import Definitions from './definitions/definitions';



let componentModule =
  angular.module('app.components',
    [
      Main.name,
      Modals.name,
      Info.name,
      Paths.name,
      Parameter.name,
      Response.name,
      Definitions.name
    ]);
//}

export default componentModule;
