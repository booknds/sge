
export default callback;

function callback(){
  return function Capitalize(input, scope) {
    if (input!=null)
      input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
}