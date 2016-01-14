import controller from './uniqueInput.controller';

export default uniqueInput;

function uniqueInput(){
  return{
      restrict: "A",
      scope:{},
      controller,
  }
}
