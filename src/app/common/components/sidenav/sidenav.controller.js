let sideNavArray = ["$scope", '$http', "CompilerService", 'FileSaver', 'Blob', SidenavCtrl];

export default sideNavArray;

function SidenavCtrl($scope, $http, cs, FileSaver, Blob){
  //var vm =  this;

  this.compiledDocument = cs.compiled;

  this.pickedFile = "";
  $scope.files = "poop";

  // $scope.$watch(function(){return this.pickedFile}.bind(this), function(newVal){
  //   if(newVal){
  //     debugger;
  //     console.log(newVal);
  //     this.pickedFile = JSON.parse(newVal);
  //   }
  // }.bind(this));

  this.onChange = function onChange_handler(event) {
    debugger;
    let file = event.target.files[0];
    let reader = new FileReader();

    //set up the onload property to fire when readAsText() below is compeleted;
    reader.onload = function __handler__(event){
      debugger;
      console.log(reader);
      $scope.$apply(function __handler__(){
        this.pickedFile = angular.copy(reader.result);
        this.pickedFile = JSON.parse(this.pickedFile);
      }.bind(this));
      //$scope.files = reader.result;
    }.bind(this);

    reader.readAsText(file);
  }

  // $scope.$on("fileSelected", function (event, args) {
  //       $scope.$apply(function () {
  //           //add the file object to the scope's files collection
  //           debugger;
  //
  //           // if (!f.type.match('image.*')) {
  //           //   continue;
  //           // }
  //
  //           let reader = new FileReader();
  //
  //
  //           //set up the onload property to fire when readAsText() below is compeleted;
  //           reader.onload = function __handler__(event){
  //             debugger;
  //             console.log(reader);
  //             $scope.$apply(function __handler__(){
  //               this.pickedFile = angular.copy(reader.result);
  //               this.pickedFile = JSON.parse(this.pickedFile);
  //             }.bind(this));
  //             //$scope.files = reader.result;
  //           }.bind(this);
  //
  //           reader.readAsText(args.file);
  //
  //
  //       }.bind(this));
  //   }.bind(this));

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

    var data = new Blob([JSON.stringify(text, null, '\t')], { type: 'application/json' });
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
