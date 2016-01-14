import angular from 'angular';

export default function InfoService(){

    //var self = this;
    var swaggerInfo = {};

    swaggerInfo = {
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
         schemes: [],
         consumes: [],
         produces: []
      }


    return{
        /*
            TODO: Have the passed object be copied to swaggerInfo instead of being assigned by reference.
        */
        setSwaggerInfo: function(newInfo){
            swaggerInfo = newInfo;
            //swaggerCompiler.updateInfo(swaggerInfo);
            //console.log('updateInfo from base info service');
            //console.log(swaggerInfo);

        },
        swaggerInfo: this.swaggerInfo,
        getSwaggerInfo: function() {
            return swaggerInfo;
        },

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
                   schemes: [],
                   consumes: [],
                   produces: []
            }
        }
    }

}
