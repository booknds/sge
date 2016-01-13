import controller from './uniqueInput.controller';

export default uniqueInput;

function uniqueInput(){
  return{
      restrict: "A",
      replace: true,
      scope:{},
      controller,
  }
}
