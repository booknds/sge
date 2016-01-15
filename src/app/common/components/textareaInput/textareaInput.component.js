import template from './textareaInput.html';
import controller from './textareaInput.controller';

export default TextareaComponent;

function TextareaComponent(){
  return{
    restrict:'E',
    template,
    scope:{},
    bindToController:{
      ngModel: '=',
      sgLabel: '@',
      required: '=?',
      ngPattern: '=?',
    },
    controller,
    controllerAs: 'textareaCtrl',
    transclude:true
  }
}
