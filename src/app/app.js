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

const INITIAL_STATE = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'My Api\'s Title!',
      version: 'My Api\'s Version!',
      description: 'Click the edit button on the right to update the information!',
    },
    paths: {},
    definitions: {},
  },
  uiState: {
    info: {
      edit: false,
    },
  },
};

const TOGGLE_INFO_EDIT = 'TOGGLE_INFO_EDIT';

function rootReducer(state, action) {
  if (angular.isUndefined(state)) {
    return INITIAL_STATE;
  }

  switch (action.type) {
    case TOGGLE_INFO_EDIT:
      const infoState = angular.copy(state.uiState.info);
      infoState.edit = action.payload;
      state.uiState.info = infoState;
      break;
    case 'ADD_CONTACT':
      if (!state.swaggerDefinition.info.contact && !state.uiState.info.contact) {
        state.swaggerDefinition.info.contact = {};
        state.uiState.info.contact = true;
      }
      break;
    case 'ADD_LICENSE':
      if (!state.swaggerDefinition.info.license && !state.uiState.info.license) {
        state.swaggerDefinition.info.license = {};
        state.uiState.info.license = true;
      }
      break;

    case 'DELETE_CONTACT':
      if (state.swaggerDefinition.info.contact && state.uiState.info.contact) {
        delete state.swaggerDefinition.info.contact;
        state.uiState.info.contact = false;
      }
      break;
    case 'DELETE_LICENSE':
      if (state.swaggerDefinition.info.license && state.uiState.info.license) {
        delete state.swaggerDefinition.info.license;
        state.uiState.info.license = false;
      }
      break;
    default:
      return state;
  }

  return state;
}

function reduxConfig($ngReduxProvider) {
  $ngReduxProvider.createStoreWith([rootReducer]);
}

reduxConfig.$inject = ['$ngReduxProvider'];

