let PathCreatorController = ["$scope", "PathService", PathModalCtrl];

export default PathCreatorController;

function PathModalCtrl($scope, PathService){

  this.newPath = {
    name:null,
    operations:{
      post:false,
      get:false,
      put:false,
      delete:false,
    }
  }

  this.prevent = {
    pathCreation: false,
  }

  this.closeModal = false;

  /*
      Add a new path object to the array containing all the paths
  */
  this.addPath = function(pathName, operation){
    try{
      PathService.addPath(pathName);
    }catch(e){
      console.log(e);
      Materialize.toast('Not a unique name!', 2000);
    }
      for(var operation in this.newPath.operations){

          if(this.newPath.operations[operation]){
            console.log("CURRENT OP");
            console.log(operation);
            console.log(this.newPath.operations);

            try{
              PathService.addOperation(pathName, operation)
            }catch(e){
              console.log(e);
            }
          }

      }


      this.newPath = {
        name:null,
        operations:{
          post:false,
          get:false,
          put:false,
          delete:false,
        }
      };

      this.prevent.pathCreation = true;

      this.closeModal = true;

  };


}
