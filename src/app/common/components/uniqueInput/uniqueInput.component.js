import controller from './uniqueInput.controller';

export default uniqueInput;

function uniqueInput(){
  return{
      restrict: "A",
      //scope:{},
      controller,
      link: function(scope, element, attrs){
        console.log("Unique controller.");

        let children = element.children();
        let newID = scope.$id;

        for(var childNode in children){

          if(children[childNode].nodeName === 'INPUT'){

            var attributes = children[childNode].attributes;

            for(var index in attributes){
              if(attributes[index].nodeName === "id"){
                attributes[index].value = newID;
              }
            }

          }else if(children[childNode].nodeName === 'LABEL'){

            var attributes = children[childNode].attributes;

            for(var index in attributes){
              if(attributes[index].nodeName === "for"){
                attributes[index].value = newID;
              }
            }

          }
        }

      }
  }
}
