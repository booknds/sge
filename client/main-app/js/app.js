var swaggerGE = angular.module("SwaggerGraphicalEditor", []);

swaggerGE.directive("pathCreator", ['$compile', function($compile) {
    return {
        
        link: function(scope, element, attrs){
        
            element.bind("click", function(){
                angular.element(
                    document.getElementById('addPath'))
                    .append($compile('<info-item  enabled-info="editorEnabled" swagger-base="basicInfo" item="name" disable-edit="disableEditors()" enable-edit="enableEditor(property)"></info-item>')(scope));
		      });
            
        }
    }
}]);