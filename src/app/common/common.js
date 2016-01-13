import angular from 'angular';
import Components from './components/components';
import Services from './services/services';
import Filters from './filters/filters';

let commonModule =
  angular.module('app.common',
  [
    Components.name,
    Services.name,
    Filters.name
  ]);

export default commonModule;
