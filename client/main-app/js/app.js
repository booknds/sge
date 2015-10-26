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

swaggerGE.directive("pathModal", ["$interval", function($interval) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            //On click
            $('.modal-trigger').leanModal();
            
        }
    }
}]);


//swaggerGE.directive("initializeOperations")

swaggerGE.directive("uniqueCheckbox", ["$interval", function($interval) {
    return {
        restrict: "E",
        templateUrl: 'templates/checkboxTemplate.html',
        replace: true,
        scope: {
            toggleOp: '&',
            uniqueId: '&',
            pathObject: '=',
            operation: '@'
        },
        link: function(scope, elem, attrs) {
            
            //var uid = scope.uniqueId({pathObj: scope.pathObject, oprtn: scope.operation});
            
            var input = angular.element(document.getElementById('input'));
            input.removeAttr('id');
            input.attr('id', scope.$id);
            
            var label = angular.element(document.getElementById('label'));
            label.removeAttr('id');
            label.removeAttr('for');
            label.attr('for', scope.$id);
            
            console.log(scope);
            
            thisOperation = scope.operation.toLowerCase();
             console.log(thisOperation);
            console.log(scope.pathObject.currentPathOperations);
            console.log(scope.pathObject.currentPathOperations[thisOperation]);
            //check if this operation was chosen and add the checkmark if it has been.
            if(scope.pathObject.currentPathOperations[thisOperation]){
                console.log('success');
                input.attr('checked', 'checked');
            }
            console.log('------------');
        }
    }
}]);

