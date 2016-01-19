import template from './parameter.html';
import controller from './parameter.controller';

export default parameterComponent;

// angular 1.5 syntax for .component();
// let appComponent = {
//   template,
//   restrict: 'E'
// }

function parameterComponent(){
  return{
    template,
    restrict: 'E',
    scope:{},
    bindToController:{
      sgContext: '=',
    },
//    replace: true,
    controller,
    controllerAs: 'paramControl',
  }
}
