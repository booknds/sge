import template from './responseEditor.html';
import controller from './responseEditor.controller';

export default ResponseEditorComponent;

function ResponseEditorComponent(){
  return{
    restrict: 'E',
    template,
    controller,
    controllerAs:'rmControl',
  }
}
