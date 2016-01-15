import angular from 'angular';
import Common from './common/common';
import Components from './components/components';
import appComponent from './app.component';
import angular_materialize from 'angular-materialize';
import angularFileSaver from 'angular-file-saver'

'use strict';

console.log(Components);

angular.module("SwaggerGraphicalEditor", [
    // 'ui.materialize',
    angular_materialize,
    'ngFileSaver',
    Common.name,
    Components.name
  ])

  .directive('app', appComponent);
