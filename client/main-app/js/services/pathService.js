swaggerGE.factory("swaggerPaths", [function(){
    
    var self = this;
    
    self.paths = [];
    
    return {
        /* create an object with that holds the basic info of a swagger document*/
        newPath: function(){
            return {
                swagger: "2.0",
                info: {
                    title: "",
                    description: "",
                    termsOfService: "",
                    contact: {
                        name: "",
                        url: "",
                        email: "",
                    },
                    license: {
                        name: "",
                        url: ""
                    },
                    version: "",
                },
               host: "",
               basePath: "",
               schemes: "",
               consumes: "",
               produces: "",
            }
        },
       newHttpVerb: function(){
           return {
               tags: "",
               summary: "",
               description:"",
               externalDocs: {
                   description: "",
                   url:""
               },
               operationId:"",
               produces:"",
               consumes:"",
               parameters: {
               },
               responses: {
               },
               schemes: "",
               deprecated: false,
               security: {
               }
               
            }
       },
        newResponse: function(){
            return {
                description: "",
                schema: {},
                headers: {},
                
            }
        },
        
        /*
           used to create single header objects that will 
            be used in response objects
        */
        newHeader: function(){
            return{
                description: "",
                type: "",
                format: "",
                items: {}
            }
        }
    }
}]);