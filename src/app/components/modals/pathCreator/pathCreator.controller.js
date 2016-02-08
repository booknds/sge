let PathCreatorController = ["$scope", "PathService", "UtilitiesService", "$log", "$mdDialog", PathModalCtrl];

export default PathCreatorController;

function PathModalCtrl($scope, PathService, UtilitiesService, $log, $mdDialog){

    this.newPath = newPathCreator();

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

        this.newPath = newPathCreator();
        $mdDialog.hide("added path");

    };

    this.cancel = function(){
        $mdDialog.cancel();
    };

    function newPathCreator() {
        return {
            name:null,
            operations:{
                post:false,
                get:false,
                put:false,
                delete:false
            }
        };
    }


}
