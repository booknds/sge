swaggerGE.service("ResponseService",["$scope", function($scope){
    
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
    
}]);