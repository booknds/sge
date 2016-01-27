'use strict';
let sideNavArray = ["$scope", '$http', "CompilerService", 'FileSaver', 'Blob', SidenavCtrl];

export default sideNavArray;

function SidenavCtrl($scope, $http, cs, FileSaver, Blob){

  this.compiledDocument = cs.compiled;

  this.pickedFile = "";

  this.onChange = function onChange_handler(event) {
    //return if the even is unidentified or null
    if(!event){ return; }

    debugger;
    let file = event.target.files[0];
    let reader = new FileReader();

    //set up the onload property to fire when readAsText() below is compeleted;
    reader.onload = function __onload_handler__(event){
      debugger;

      $scope.$apply(function __apply_handler__(){
        //use $apply() to fire manual watchers to this.pickedFile
        let file_content = angular.copy(reader.result);
        this.pickedFile = JSON.parse(file_content);
        let parsed_file_content = JSON.parse(file_content);

        cs.distributeImportedDefinitionToServices(parsed_file_content);

      }.bind(this));

    }.bind(this);

    //read in the file as a string -> sets of reader.onload() when complete.
    reader.readAsText(file);

  }.bind(this);

  /*
  *
  *
  */
  this.recompile = function recompile(){
    cs.recompile();
  };

  this.download = function download(text){
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


}
