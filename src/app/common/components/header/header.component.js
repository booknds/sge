import template from './header.html';

// angular 1.5 syntax
// let appComponent = {
//   template,
//   restrict: 'E'
// }

function headerComponent(){
  return{
    template,
    replace:true,
    restrict: 'E'
  }
}

export default headerComponent;
