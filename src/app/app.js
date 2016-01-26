import angular from 'angular';
import Common from './common/common';
import Components from './components/components';
import appComponent from './app.component';
import angular_materialize from 'angular-materialize';
import angularFileSaver from 'angular-file-saver';
import AngularMaterial from 'angular-material';
import AngularAnimate from 'angular-animate';
import AngularAria from 'angular-aria';
import 'angular-material/angular-material.css';

'use strict';

console.log(AngularMaterial);

angular.module("SwaggerGraphicalEditor", [
    // 'ui.materialize',
    angular_materialize,
    'ngFileSaver',
    Common.name,
    Components.name,
    AngularMaterial,
    AngularAnimate,
    AngularAria,
    // 'ngMaterial',
    // 'ngAnimate',
    // 'ngAria'
  ])

  .directive('app', appComponent);
