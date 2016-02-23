/**
 * @name InfoService
 * @desc A singleton module to hold Base definition state and manipulate it's info.
 * @type {Function}
 */
export default function InfoService($log, UtilitiesService) {

    /**
     * @name swaggerInfo
     * @desc Contains the state of the swagger definition's base info
     * @type {Object}
     */
    let swaggerInfo = {
        swagger: "2.0",
        info: {
            title: "",
            description: "",
            termsOfService: "",
            contact: {
                name: "",
                url: "",
                email: ""
            },
            license: {
                name: "",
                url: ""
            },
            version: ""
        },
        host: "",
        basePath: "",
        schemes: [],
        consumes: [],
        produces: []
    };

    return {
        getBaseInfo,
        setBaseInfo,
        addType,
        removeType
    };

    /**
     * @name addType
     * @desc Adds a type to one of the three lists 'schemes', 'consumes', or 'produces'
     * @type {Function}
     */
    function addType(list, type) {
        // check if list exists
        if (!validList(list)) {
            $log.log("List does not exist");
            UtilitiesService.toast("List does not exist", 3000);
            // throw "List does not exist";
        }

        // check if type exists
        if (type) {
            // check if type is already in the list
            if (swaggerInfo[list].indexOf(type) === -1) {
                swaggerInfo[list].push(type);
            } else {
                $log.log("Type already exists in this list");
                UtilitiesService.toast("Type already exists in this list", 3000);
                // throw "Type already exists in this list";
            }

        } else {
            $log.log("Type not chosen!");
            UtilitiesService.toast("Type not chosen!", 3000);
            // throw "Type not chosen!";
        }
    }

    /**
     * @name removeType
     * @desc Removes a type from one of the three lists 'schemes', 'consumes', or 'produces'
     * @type {Function}
     */
    function removeType(list, type) {
        // check if list exists
        if (!validList(list)) {
            $log.log("List does not exist");
            UtilitiesService.toast("List does not exist", 3000);
            // throw "List does not exist";
        }

        let index = swaggerInfo[list].indexOf(type);

        if (index >= 0) {
            swaggerInfo[list].splice(index, 1);

        } else {
            $log.log("Type already deleted");
            UtilitiesService.toast("Type already deleted", 3000);
            // throw "Type already deleted";
        }
    }

    /**
     * @name getBaseInfo
     * @desc returns a reference of the state of the swaggerInfo object
     * @type {Function}
     */
    function getBaseInfo() {
        return swaggerInfo;
    }

    /**
     * @name setBaseInfo
     * @desc sets the swaggerInfo object to a copy of the passed new swaggerInfo object
     * @type {Function}
     */
    function setBaseInfo(newSwaggerInfo) {
        debugger;
        // swaggerInfo = angular.copy(newSwaggerInfo);
        // console.log(swaggerInfo);
        for (var key in newSwaggerInfo) {
            if (swaggerInfo.hasOwnProperty(key)) {
                swaggerInfo[key] = newSwaggerInfo[key];
            }
        }
    }

    /**
     * @name validList
     * @desc helper function that checks if the passed list name is valid as per the definition
     * @type {Function}
     */
    function validList(list) {
        if (list === "produces" || list === "consumes" || list === "schemes") {
            return true;
        } else {
            return false;
        }
    }
}
