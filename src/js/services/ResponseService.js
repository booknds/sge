swaggerGE.factory("ResponseService",[function(){

    function Response(){
        this.description = null;
        this.headers = {};


    }

    function Header(name){
        this[name] = new HeaderObject();

        this.HeaderObject = function(){
            return {
                description:"",
                type:"",
                format:"",
                items: new Object(), //should be an 'items' object
                collectionFormat:"",


            }
        }

    }

    function Headers(){

        this.addHeader = function(headerName){
            return new Header(headerName);
        }
    }

    /**
      Responses Object
    */
    function Responses(){

      this.responseList = new Array();

    }

    /**
      Responses function
    */
    Responses.prototype = {
      /**

      */
      addResponse: function(httpCode, description){
        this.responseList.push(new Response(httpCode, desctiption));
      },

      /**
      */
      removeResponse: function(httpCode){

        this.responseList.forEach(function(resp, index, responseList){
          if(resp.hasOwnProperty(httpCode)){
            this.responseList.splice(index, 1);
            return;
          }
        });

      },

      /**
      */
      getResponse: function(httpCode){
        var response = null;

        this.responseList.forEach(function(resp, index, responseList){
          if(resp.hasOwnProperty(httpCode)){
            response = resp;
            return;
          }
        });

        return angular.copy(response);

      },

      /**
        Check to see if a response exists in the list
      */
      responseExists: function(httpCode){
        var exists = false;

        this.responseList.forEach(function(response, index, responseList){
          if(response.hasOwnProperty(httpCode)){
            exists = true;
            return;
          }
        });

        return exists;
      },

    };

    /**
      Response Object
    */
    function Response(httpCode, descrip){

      /*
      this[httpCode] = {
        description: descrip,
        schema: new Object(),
        headers: new Object(),
        examples: new Object()
      };*/
      this.code = httpCode
      this.description = descrip,
      this.schema = new Object(),
      this.headers = new Object(),
      this.examples = new Object()
    }

    /**
      Response Functions
    */
    Response.prototype = {};

    return {
      newResponse: function(httpCode, description){
        var response = null;
        var temp = null

        if(!httpCode)
          throw "To create a response code please pass a http code status"
        else if(!description)
          throw "A description is required to create a response"
        else
          return new Response(httpCode, description);

          //response = temp[httpCode];

          //return response;

      },
      hasResponse: function(pathName, operation, httpCode){
        
      }
    }
}]);
