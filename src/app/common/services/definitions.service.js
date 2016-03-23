let definitionService = ["ObjectFactory", "UtilitiesService", DefinitionsService];

export default definitionService;

/**
 * Module Service to hold the state and methods of definitions
 */
export function DefinitionsService(ObjectFactory, UtilitiesService) {

    var definitions = {};

    var publicAPI = {
        addDefinition,
        clearDefinitions,
        updateDefinition,
        getDefinitions,
        setDefinitions,
        getDefinition,
        deleteDefinition
    };

    return publicAPI;

    /**
     * Adds a new definition object to the list of definitions
     * @param {string} definitionName - name of definition object
     * @param {string} description - descrition of the definition object
     * @param {string} type - specific type of definition object
     */
    function addDefinition(definitionName, description, type) {
        if (definitions.hasOwnProperty(definitionName)) {
            // throw "Cannot Add, Definition Already Exists";
            console.warn("Cannot Add, Definition Already Exists");
            UtilitiesService.toast("Cannot Add, Definition Already Exists", 3000);
        } else {

            definitions[definitionName] = ObjectFactory.newSchema(definitionName, description, type);
        }
    }


    /**
     * Removes all definition keys from the list
     */
    function clearDefinitions() {
        for (let key in definitions) {
            if (definitions.hasOwnProperty(key)) {
                delete definitions[key];
            }
        }
    }

    /**
     * Updates a definition
     * @param {object} originalDefinition - original state of a definition
     * @param {object} updatedDefinition - modified definition
     */
    function updateDefinition(originalDefinition, updatedDefinition) {
        var oName = originalDefinition.name,
            // oValue = originalDefinition.value,
            uName = updatedDefinition.name,
            uValue = updatedDefinition.value;

        if (oName === uName) {
            let definitionToUpdate = definitions[oName];

            for (var defKey in definitionToUpdate) {
                if (definitionToUpdate.hasOwnProperty(defKey)) {
                    definitionToUpdate[defKey] = uValue[defKey];
                }
            }

        } else {

            if (definitions.hasOwnProperty(uName)) {
                UtilitiesService.toast("Definition already exists, cannot change definition name.", 3000);

                return;

            } else {

                addDefinition(uName);

                let currentDefinition = definitions[uName];

                for (var key in currentDefinition) {
                    if (currentDefinition.hasOwnProperty(key)) {
                        currentDefinition[key] = uValue[key];
                    }
                }

                delete definitions[oName];

            }
        }

    }

    /**
     * Returns the entire list of definitions
     * @returns {object}
     */
    function getDefinitions() {
        return definitions;
    }

    /**
     * Replaces the current definition set with a new definitions object
     * @param {object} newDefinitions - a list of definitions
     */
    function setDefinitions(newDefinitions) {
        for (let definition in newDefinitions) {
            if (newDefinitions.hasOwnProperty(definition)) {
                definitions[definition] = ObjectFactory.newSchema();
                definitions[definition].setSchema(newDefinitions[definition]);
            }
        }
    }

    /**
     * Returns a specified definition
     * @param {string} definitionName - a specific definition key
     * @returns {object}
     */
    function getDefinition(definitionName) {
        return definitions[definitionName];
    }

    /**
     * Removes a specified definition
     * @param {string} definitionName - a specific definition key
     */
    function deleteDefinition(definitionName) {
        delete definitions[definitionName];
    }

}
