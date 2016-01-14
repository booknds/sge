import angular from 'angular';
import textInputComponent from './textInputField.component';

let TextInputModule =
  angular.module('TextInputModule', [])
          .directive("sgTextInput", textInputComponent);

export default TextInputModule;
