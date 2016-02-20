let path = ["$log", "ObjectFactory", "UtilitiesService", PathService];

export default path;

/**
 */
function PathService($log, ObjectFactory, UtilitiesService) {

    var paths = {};

    this.paths = paths;

    this.setPaths = function(newPaths) {
        debugger;
        // paths = angular.copy(newPaths);
        // this.paths = paths;
        // console.log(paths);
        for (var key in newPaths) {
            if (newPaths.hasOwnProperty(key)) {
                paths[key] = ObjectFactory.newPath();
                // paths[key] = newPaths[key];
                paths[key].setPath(newPaths[key]);
            }
        }
    };

    this.clearPaths = function clearPaths() {
        for (var key in paths) {
            if (paths.hasOwnProperty(key)) {
                delete paths[key];
            }
        }
    };

    this.addPath = function(pathName) {
        if (hasPath(pathName)) {
            $log.warn("Path name already exsists, could not add");
            UtilitiesService.toast("Path name already exsists, could not add");
        } else {
            paths[pathName] = ObjectFactory.newPath();
        }
    };

    this.removePath = function(pathName) {
        if (hasPath(pathName)) {
            delete paths[pathName];
        } else {
            throw "Not a valid path to delete";
        }
    };

    this.updatePathName = function(oldPathName, newPathName) {
        if (oldPathName === newPathName) {
            return;
        }

        if (!hasPath(newPathName)) {
            paths[newPathName] = angular.copy(paths[oldPathName]);
            delete paths[oldPathName];
        } else {
            throw "Original path name does not exist, could not update name";
        }

    };

    /**
     */
    function hasPath(pathName) {
        return paths.hasOwnProperty(pathName);
    }

    /* make a separate Operations class */
    this.addOperation = function(pathName, operation) {

        // $log.log("PATH SERVICE: adding operation");
        if (hasPath(pathName)) {
            paths[pathName].addOperation(operation);
        } else {
            $log.warn("Cannot add Operation, path does not exist");
            UtilitiesService.toast("Cannot add Operation, path does not exist");
        }

        // if(hasPath(pathName)){
        // //  debugger;
        //
        // }else {
        //   throw "Cannot add Operation, path does not exist"
        // }
    };

    /*
        Deletes an operation from a given service.
    */
    this.removeOperation = function(pathName, operation) {
        debugger;
        paths[pathName].removeOperation(operation);

    };

    /*
        Tries to create and validate a new parameter object.
    */
    this.addNewParam = function(operation, paramName, paramIn) {
        var pIn = paramIn || "query";

        if (!operation.hasParameter(paramName, pIn)) {
            operation.addParameter(paramName, pIn);
        } else {
            // throw "Invalid Parameter Name-in combination, must be unique.";
            $log.warn("Invalid Parameter name/in combo, must be unique");
            UtilitiesService.toast("Invalid Parameter name/in combo, must be unique", 3000);
        }
    };

    this.removeResponse = function(pathName, operation, httpCode) {
        delete paths[pathName][operation].responses[httpCode];
    };

    this.updateResponse = function(originalData, newData) {

        debugger;

        if (originalData.httpCode !== newData.httpCode) {
            if (originalData.responses.hasResponse(newData.httpCode)) {
                throw "Http Code already exists";
            }
        } else {
            let responseList = originalData.responses;
            let originalResponse = responseList.getResponse(originalData.httpCode);
            let newResponse = newData.response;

            responseList.updateResponse(originalResponse, newResponse);
        }

    };

    return this;
}
