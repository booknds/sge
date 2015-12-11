var swaggerGE = angular.module("SwaggerGraphicalEditor", ['ui.materialize']);

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

/*swaggerGE.directive("pathModal", ["$interval", function($interval) {
    return {
        restrict: "A",
        compile:null,
        link: function(scope, elem, attrs) {
            //On click
            if(scope.triggerModal){
                $('.modal-trigger').leanModal();
                scope.triggerModal = false;
            }
            //console.log('triggerModal');
            //$('.modal-trigger').leanModal();

        }
    }
}]);*/

/*swaggerGE.directive("paramModal", ["$interval", function($interval) {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            //On click
            //if(scope.triggerModal){
            console.log('paramModal');
                $('.param-modal-trigger').leanModal();
            //    scope.triggerModal = false;
            //}
            //console.log('triggerModal');
            //$('.modal-trigger').leanModal();

        }
    }
}]);*/

/*swaggerGE.directive("addParam", ["$interval", function($interval) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
           // console.log(scope);
           //console.log("ATTEMPTING!!!!!!!!!!!!!!!!!!!!!");
            //$('select').material_select();
            if(element.is("select")){
                //console.log("IS SELECT");
                element.material_select();
            }

        }
    }
}]);*/

/*swaggerGE.directive("initCollapse", ["$interval", function($interval) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
           // console.log(scope);
           //console.log("ATTEMPTING!!!!!!!!!!!!!!!!!!!!!");
            //$('select').material_select();
            if(element.hasClass('collapsible')){
                //console.log("IS SELECT");
                element.collapsible({
                  accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });
            }

        }
    }
}]);*/

/**
 *  Mark updated
*/
swaggerGE.directive("selectValue", function(){
    return {
        link: function(scope, element, attrs){

           scope.$watch('updateParamModal', function(update){
               if(update){
                   var paramIn = scope.currentParam.inLocation;

                   for(var i = 1; i < 6; i++){
                        //console.log(element.children()[i]);
                        //console.log(element.children()[i].value);
                        if(paramIn === element.children()[i].value){

                            var child = angular.element(element.children()[i]);
                            child.attr('selected', '');
                        }
                    }

                   scope.updateParamModal = false;
               }
           })

        }
    }
});

swaggerGE.directive("closePathModal", function(){
    return {
      link: function(scope, element, attrs){
        //console.log(scope);
        scope.$watch('closePathModal', function(update){
          //console.log("CLOSE PATH MODAL");
          if(scope.closePathModal === true){
            $('#path-creation-modal').closeModal();
            scope.closePathModal = false;
          }
        });


      }
    }
});

swaggerGE.directive("colorize", function(){
    return {
      scope: {

      },
      link: function(scope, element, attrs){

          /*
          ng-class="{'blue': '{{operation}}' == 'get',
            'orange': '{{operation}}' === 'put',
            'green': '{{operation}}' === 'post',
            'red': '{{operation}}' === 'delete', }"
            */
          //  operation = element.text();

//            if()

            console.log("operation: " + operation);

            switch(operation){

            }

        }
    }
});

/*swaggerGE.directive("modalFocus", function(){
    return {
      scope: {

      },
      link: function(scope, element, attrs){

          //attrs.focus

        }
    }
});*/
swaggerGE.directive("deepWatch", function(){
    return {
      scope: {
        param: '='
      },
      link: function(scope, element, attrs){

          scope.$watch('param', function(newValue, oldValue) {
            if (newValue){
            //  console.log("I see a data change!");
            //  scope. = angular.copy($scope.data);
            }

        },true);
    }
  }
});

swaggerGE.directive("uniqueCheckbox", ["$interval", function($interval) {
    return {
        restrict: "AE",
        //templateUrl: 'js/templates/checkboxTemplate.html',
        replace: true,
        scope: {
            //toggleOp: '&',
            //uniqueId: '&',
            //pathObject: '=',
            //operation: '='
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

            //console.log(scope.operation);

            //thisOperation = scope.operation.toLowerCase();
            //console.log(thisOperation);
            //console.log(scope.pathObject.currentPathOperations);
            //console.log(scope.pathObject.currentPathOperations[thisOperation]);
            //check if this operation was chosen and add the checkmark if it has been.

            //if(scope.pathObject.currentPathOperations[thisOperation]){
              //  console.log('success');
            //    input.attr('checked', 'checked');
            //}
            //console.log('------------');
        }
    }
}]);
