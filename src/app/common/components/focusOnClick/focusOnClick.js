import angular from 'angular';
import FocusOnClickComponent from './focusOnClick.component';

let FocusModule =
  angular.module('FocusModule', [])
          .directive('focusMe', FocusOnClickComponent);

export default FocusModule;
