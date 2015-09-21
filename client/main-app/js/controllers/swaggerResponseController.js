swaggerGE.controller("verbResponse", ['$scope', function($scope) {
    var response = function(){
        return {
            description:"",             //required by SWAGGER definition
            schema:{},
            headers:{
                HeaderName:{
                    description:"",
                    type:"",            //required by SWAGGER definition
                    format:"",
                    items:{},           //required if 'type' is an 'array'
                    collectionFormat:"",
                    
                }
            },
            examples:{
                mimeType:{
                }
            }
        }
    };
    
    var additionalHeaderAttributes = [
        'maximum', 
        'exclusiveMaximum',
        'minimum',
        'exclusiveMinimum',
        'maxLength',
        'minLength',
        'pattern',
        'maxItems',
        'minItems',
        'uniqueItems',
        'enum',
        'multipleOf' ];
}]);