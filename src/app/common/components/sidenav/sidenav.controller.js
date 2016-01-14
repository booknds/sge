let sideNavArray = ["$scope", '$element', '$attrs', "CompilerService", 'FileSaver', 'Blob', SidenavCtrl];

export default sideNavArray;

function SidenavCtrl($scope, $element, $attrs, cs, FileSaver, Blob){
  //var vm =  this;

  this.compiledDocument = cs.compiled;

  console.log($element);
  console.log($attrs);



  // console.log($element(".button-collapse"))

  /*
  *
  *
  */
  this.recompile = function(){
    cs.recompile();
  };

  this.download = function(text){
    this.compiledDocument = cs.compiled;
    this.recompile();
    text = cs.compiled;

    console.log(text);

    if(Object.keys(text).length === 0){
      Materialize.toast("Definition Cannot be empty", 3000);
      return;
    }

    var data = new Blob([JSON.stringify(text)], { type: 'application/json' });
    FileSaver.saveAs(data, 'swagger.json');
  }

  /*$scope.$watch(function(){return cs.compiled;}, function(newVal){
    console.log("COMPILKED CHANGED");
    console.log(newVal)
    if(newVal){
      vm.compiledDocument = cs.compiled;
      //vm.definitions = ds.definitions;
    }
  }, true);*/

}
