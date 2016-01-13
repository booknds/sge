import template from './footer.html';

// angular 1.5 syntax
// let appComponent = {
//   template,
//   restrict: 'E'
// }

function footerComponent(){
  return{
    template,
    restrict: 'E'
  }
}

export default footerComponent;
