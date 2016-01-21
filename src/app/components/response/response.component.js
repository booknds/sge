import template from './response.html';
import controller from './response.controller';

export default responseComponent;

// angular 1.5 syntax for .component();
// let appComponent = {
//   template,
//   restrict: 'E'
// }

function responseComponent(){
  return{
    template,
    scope:{},
    bindToController:{
      sgContext: '=',
      sgThisOperation: '@',
    },
    restrict: 'E',
//    replace: true,
    controller,
    controllerAs: 'responseControl',
  }
}
