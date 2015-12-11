swaggerGE.factory("ParameterService", [function(){

  var debug = true;

  var Parameters = function(){
      this.parameterList = new Array();
  }

  Parameters.prototype = {
      /*
          This function add a new Parameter Object to the ParameterList
              By the Swagger definitions, "name" and "in" properties are
              required when making any parameter.
      */
      addParameter: function(paramName, paramIn){
          if(debug)
              console.log("PARAMETERS - Adding Param: " + paramName + ", " + paramIn);

          this.parameterList.push(new Parameter(paramName, paramIn));

          if(debug){
              console.log("PARAMETERS - Addws Param, paramList:  ");
              console.log(this.parameterList);
              console.log("-----------------------------------------------------")
          }
      },

      /*
          By the Swagger definition, each parameter is uniquely identified by
              The combination of the Parameter's "name" and "in" properties.
      */
      removeParameter: function(paramName, paramIn){
          if(debug)
              console.log("PARAMETER - Removing Param: " + paramName + ", " + paramIn);

          this.parameterList.forEach(function(parameter, index, paramList){
              if(parameter.name === paramName && parameter.inLocation === paramIn){
                  console.log("Removing: ");
                  console.log(paramList[index]);
                  console.log(parameter)
                  paramList.splice(index, 1);
                  return;
              }
          })

      },

      /*
          This function checks to see if the passed Parameter already Exists.
      */
      hasParameter: function(paramName, paramIn){
          if(debug)
              console.log("PARAMETER: Validating Param: " + paramName + ", " + paramIn);

          var found = 0;

          this.parameterList.forEach(function(parameter, pos, paramList){
              if(parameter.name === paramName && parameter.inLocation === paramIn){

                  found = 1;

                  return;
              }
          })

          if(found)
              return true;
          else
              return false;
      },

      /*

      */
      getParameterList: function(){
          var paramListClean = new Array();
          this.parameterList.forEach(function(parameter, index, paramList){
              console.log(parameter.getJSON());
             paramListClean.push(parameter.getJSON());
          });

          console.log(paramListClean);

          return paramListClean;
      },

      getParameter:function(name, inLoc){

          console.log("---\nGETPARAM");
          console.log(name + ", " + inLoc);
          var param;
          this.parameterList.forEach(function(parameter, index, paramList){
              console.log('-');
              console.log(parameter);
              console.log(parameter.name + ", " + name + ", " + parameter.inLocation + ", " + inLoc);
              if(parameter.name === name && parameter.inLocation === inLoc){
                  param = parameter;
                  console.log("hit!");
              }
          });

          console.log(param);
          console.log("---");
          return param;
      }
  }

  var Parameter = function(name, inLocation){
      this.name = name || "";
      this.inLocation = inLocation || "";
      this.description = null;
      this.required = (this.inLocation === "path") ? true : false;
      this.schema = new Object();
      this.type = "";
      this.format ="";
      this.allowEmptyValue = false;
      this.items= new Object();
      this.collectionFormat = "";

  }

  Parameter.prototype = {
      setName: function(newName){
          if(debug)
              console.log("Setting Param 'name': " + newName);

          this.name = newName;
      },

      getName: function(){
          return this.name;
      },

      setIn: function(newInLocation){
          if(debug)
              console.log("Setting Param 'in': " + newInLocation);

          this.inLocation = newInLocation;
      },

      getIn: function(){
          return this.inLocation;
      },

      setDescription: function(newDesc){
          if(debug)
              console.log("Setting Param 'description':" + newDesc);

          this.description = newDesc;
      },

      getDescription: function(){
          return this.description;
      },

      isRequired: function(flag){
          if(debug)
              console.log("Setting Param 'required':" + flag);

          this.required = flag;
      },

      getRequired: function(){
        return this.required;
      },

      getJSON: function(){

          var paramJSON = {};

          if(this.name){
              paramJSON.name = this.name;
          }

          if(this.inLocation){
              paramJSON.in = this.inLocation;
          }

          if(this.description){
              paramJSON.description = this.description;
          }

          paramJSON.required = this.required;

          /*return {
              name: this.name,
              in: this.inLocation,
              description: this.description,
              required: this.required
          }*/

          return paramJSON;
      }

  }

  /*this.newParam = function(name, id){
    return new newParameter(name, id);
  }*/

  function newParameters(){
    return new Parameters();
  }

  function newParameter(name, inLocation){
    return new Parameter(name, inLocation);
  }

  return {
    newParameters:newParameters,
    newParameter:newParameter
  }

  /*
      Tries to create and validate a new parameter object.

  this.addNewParam = function(pathName, operation, paramName, paramIn){
      if(debug){
          console.log("PATH SERVICE: Attempting to add a new Parameter");
          console.log(pathName);
          console.log(operation);
          console.log(paramName);
      }

      var pIn = paramIn || "query";

      var path = paths[pathName][operation];

      if(validateParam(pathName, operation, paramName, pIn)){
          path.parameters.addParameter(paramName, pIn);
          self.chosenParameter = {
              path:pathName,
              operation:operation,
              paramName:paramName,
              inLoc:pIn
          }
      }else{
          throw "Invalid Parameter Name-in combination, must be unique."
      }
  }


  this.getParamList = function(pathName, operation){

      var currentPath = paths[pathName][operation];
      //console.log("LJFLAFJALKFJALF");
      //console.log(pathName);

      //console.log(currentPath);

      //console.log(currentPath.parameters);

      return currentPath.parameters.getParameterList();

  }

  this.getParam = function(pathName, operation, paramName, paramIn){
      console.log("------------------\nGETTING PARAM NAME");
      console.log(pathName + ", " + operation + ", " + paramName + ", " + paramIn);
      var paramObject = paths[pathName][operation].parameters.getParameter(paramName, paramIn);
      console.log(paramObject);
      console.log("------------------");
      return paramObject
  };


  var validateParam = function(pathName, operation, paramName, paramIn){
      if(debug)
          console.log("PATH SERVICE: Validating Param: " + paramName + ", " + paramIn + ", " + pathName + ", " + operation);

      var path = paths[pathName][operation];

      if(path.parameters.hasParameter(paramName, paramIn)){
          if(debug)
              console.log("\t Same Parameter found, returning false!");

          return false;
      }else{
          if(debug)
              console.log("\t Parameter NOT found, returning true!");

          return true;
      }
  }

  this.updateParameter = function(tempParameter){

    console.log(tempParameter);

    var originalData = tempParameter.originalValues;

    //validate new param
    //check to see if the name - inLocation pair of the parameter was changed
    if(originalData.name !== tempParameter.name || originalData.inLocation !== tempParameter.inLocation){

      console.log("name is not the same or inLocation not the same");
      console.log("\tname: " + originalData.name + ", " + tempParameter.name);
      console.log("\tinLocation: " + originalData.inLocation + ", " + tempParameter.inLocation);
      //if they have been changed check if the new combo is legitamit
      if(!validateParam(originalData.path, originalData.operation, tempParameter.name, tempParameter.inLocation)){
        throw "Invalid Parameter Name-in combination, must be unique."
      }
    }

      console.log("name and inLocation are the same");

      var originalParam = paths[originalData.path][originalData.operation].parameters.getParameter(originalData.name, originalData.inLocation);
      //var newParameter = new Parameter();

      for(var key in tempParameter){
        if(tempParameter.hasOwnProperty(key) && key !== 'originalValues' && key !== "schema"){
          originalParam[key] = tempParameter[key];
        }
        if(key === "schema"){
          if(tempParameter[key] instanceof Object)
            originalParam[key] = tempParameter[key];
          else
            originalParam[key] = JSON.parse(tempParameter[key]);
        }
      }

  }
*/

}])
