swaggerGE.directive("infoItem", [function(){
    return {
        restrict: 'E',
        templateUrl: 'js/templates/infoItemTemplate.html',
        replace: true,
        scope: {
            enabledInfo: '=',
            swaggerBase: '=',
            item: "@",
            disableEdit: "&",
            enableEdit: "&"
        },
        link:
            function(scope, element, attrs ){
                //console.log(element);
                //console.log(attrs);

                //element.bind('click',)
            }
    }

}]);
