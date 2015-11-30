swaggerGE.factory("ParameterService", [function(){
  var Parameter = function(name, inLocation){
      this.name = name || "",
      this.inLocation = inLocation || "";
      this.description = null;
      this.required = (this.inLocation === "path") ? true : false;
      this.schema = new Object();
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

}])
