import template from './app.html';

// angular 1.5 syntax
// let appComponent = {
//   template,
//   restrict: 'E'
// }ssss

function appComponent(){
  return{
    template,
    restrict: 'E'
  }
}

export default appComponent;
