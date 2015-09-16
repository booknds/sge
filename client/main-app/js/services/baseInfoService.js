swaggerGE.factory("swaggerBaseInfo", [function(){

    return {
        /* create an object with that holds the basic info of a swagger document*/
        newBaseInfo: function(){
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
        }
    }
}]);