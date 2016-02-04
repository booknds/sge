let PathCreatorController = ["$scope", "PathService", "UtilitiesService", "$log", "$mdDialog", PathModalCtrl];

export default PathCreatorController;

function PathModalCtrl($scope, PathService, UtilitiesService, $log, $mdDialog){

    this.newPath = {
        name:null,
        operations:{
            post:false,
            get:false,
            put:false,
            delete:false
        }
    };

    // this.prevent = {
    //     pathCreation: false
    // };

    //this.closeModal = false;

    /*
      Add a new path object to the array containing all the paths
    */
    this.addPath = function(pathName, operations){
        try {
            PathService.addPath(pathName);
        } catch (e) {
            $log.log(e);
            UtilitiesService.toast(e);
        }
        
        // debugger;
        for (var operation in operations) {

            if (operations[operation]) { 

                try {
                    PathService.addOperation(pathName, operation);
                } catch(e) {
                    $log.log(e);
                }
            }

        }


        this.newPath = {
            name:null,
            operations:{
                post:false,
                get:false,
                put:false,
                delete:false
            }
        };

        //this.prevent.pathCreation = true;

        //this.closeModal = true;

        $mdDialog.hide("added path");

    };

    this.cancel = function(){
        $mdDialog.cancel();
    };


}
