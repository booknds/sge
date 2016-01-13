import controller from './modalCloser.controller';

export default modalCloser;

function modalCloser(){
  return{
      restrict: "A",
      replace: true,
      scope:{
        ngModel: "=?",
        modalId: "@"
      },
      controller,
  }
}
