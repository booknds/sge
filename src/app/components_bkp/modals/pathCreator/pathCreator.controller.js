let PathCreatorController = ["PathService", "$mdDialog", PathModalCtrl];

export default PathCreatorController;

/**
 */
function PathModalCtrl(PathService, $mdDialog) {

    this.newPath = newPathCreator();

    /*
      Add a new path object to the array containing all the paths
    */
    this.addPath = function(pathName, operations) {

        PathService.addPath(pathName);


        // debugger;
        for (var operation in operations) {

            if (operations[operation]) {
                PathService.addOperation(pathName, operation);

            }

        }

        this.newPath = newPathCreator();
        $mdDialog.hide(pathName);

    };

    this.cancel = function() {
        $mdDialog.cancel();
    };

    /**
     */
    function newPathCreator() {
        return {
            name: null,
            operations: {
                post: false,
                get: false,
                put: false,
                delete: false
            }
        };
    }


}
