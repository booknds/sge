// import Common from './common/common';
import Components from './components/components';
import appComponent from './app.component';
// import angularMaterialize from 'angular-materialize';
// import FileSaver from 'angular-file-saver';
import angular from 'angular';
import AngularMaterial from 'angular-material';
import AngularAnimate from 'angular-animate';
import AngularAria from 'angular-aria';
import AngularMessages from 'angular-messages';
import ngRedux from 'ng-redux';
// import AngularCookies from 'angular-cookies';
// import AngularMocks from 'angular-mocks/ngMock';
import 'angular-material/angular-material.css';
import '../css/main.css';
import reducers from './reducers/rootReducer';
import { combineReducers } from 'redux';

angular
  .module('SwaggerGraphicalEditor', [
    // 'ui.materialize',
    // angularMaterialize,
    // 'ngFileSaver',
   // Common.name,
    Components.name,
    AngularMaterial,
    AngularAnimate,
    AngularAria,
    AngularMessages,
    ngRedux,
    // AngularMocks,
    // AngularCookies,
  ])
  .config(reduxConfig)
  .directive('app', appComponent);

function reduxConfig($ngReduxProvider) {
  const reducer = combineReducers(reducers);
  console.log(reducer);
  $ngReduxProvider.createStoreWith(reducers);
}

reduxConfig.$inject = ['$ngReduxProvider'];

