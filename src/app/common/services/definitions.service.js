let definitions = ["$log", "ObjectFactory", DefinitionsService];

export default definitions;

function DefinitionsService($log, ObjectFactory){

    this.addDefinition = function(definitionName, description, type){
        // debugger;
        if(hasDefinition(definitionName))
            throw "Cannot Add, Definition Already Exists";
        else{
            $log.log("adding definitiion");

            this.definitions.addDefinition(definitionName, description, type);
        }
    };

    this.setDefinitions = function setDefinitions(newDefinitions){
        // debugger;
        this.definitions.setDefinitions(newDefinitions);
    };

    this.clearDefinitions = function clearDefinitions(){
        this.definitions.clearDefinitions();
    };

    function hasDefinition(definitionName){
        if (definitions.hasOwnProperty(definitionName)) {
            return true;
        } else {
            return false;
        }
    }

    this.addProperty = function(definitionName, propertyName){

        // $log.log("this add property");
        // $log.log(definitionName, propertyName);

        if (hasProperty(definitionName, propertyName)) {
            throw ("Property '" + propertyName + "' already exists in definition: " + definitionName);

        } else {

            definitions[definitionName].properties[propertyName] = ObjectFactory.newSchema();
            //definitions[definitionName].properties[propertyName].type = null;
        }

    };

    function hasProperty(definitionName, propertyName){
        $log.log("HAS PROPERTY");
        $log.log(definitionName, propertyName);

        // if(definitions[definitionName].properties.hasOwnProperty(propertyName))
        //     return true;
        // else
        //     return false;

        return definitions[definitionName].properties.hasOwnProperty(propertyName);
    }

    this.updateDefinition = function(originalDefinition, updatedDefinition){
        $log.log("SERVICE - update definition");
        var oName = originalDefinition.name,
            //oValue = originalDefinition.value,
            uName = updatedDefinition.name,
            uValue = updatedDefinition.value;

        if (oName === uName) {
            var definitionToUpdate = definitions[oName];

            for (var defKey in definitionToUpdate) {
                definitionToUpdate[defKey] = uValue[defKey];
            }

        } else {

            if (hasDefinition(uName)) {

                throw "Definition already exists, cannot change definition name.";

            } else {

                this.addDefinition(uName);

                var currentDefinition = definitions[uName];

                for (var key in currentDefinition) {
                    currentDefinition[key] = uValue[key];
                }

                delete definitions[oName];

            }
        }

    };

    this.newSchema = function(title, description, type){
        // let temp = Object.create(Schema);
        // temp.init(title, description, type);
        // return temp;
        return ObjectFactory.newSchema(title, description, type);
    };

    this.deleteDefinition = function(definitionName){
        delete this.definitions[definitionName];
    };

    var definitions = ObjectFactory.newDefinitions();

    this.definitions = definitions;
    //$log.log(definitions);

    //debugger;

    return this;

}
