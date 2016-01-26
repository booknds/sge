'use strict';

export default FileUploadComponent;

function FileUploadComponent() {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                    debugger;
                    console.log(event);
                }
            });
        }
    };
};
/**
restrict: 'A',
require: 'ngModel',
scope: {
  fileChange: '&',
  objectToHoldUpload: '='
},
link: function link(scope, element, attrs, ctrl) {
  element.on('change', onChange);

  scope.$on('destroy', function () {
    element.off('change', onChange);
  });

  function onChange() {

    attrs.multiple ? ctrl.$setViewValue(element[0].files) : ctrl.$setViewValue(element[0].files[0]);
    scope.$apply(function () {
      debugger;
      scope.fileChange();
    });
  }
}
**/
//
// function FileUploadComponent() {
//     return {
//         scope: true,        //create a new scope
//         link: function (scope, el, attrs) {
//             el.bind('change', function (event) {
//                 var files = event.target.files;
//                 //iterate files since 'multiple' may be specified on the element
//                 for (var i = 0;i<files.length;i++) {
//                     //emit event upward
//                     scope.$emit("fileSelected", { file: files[i] });
//                     debugger;
//                     console.log(event);
//                 }
//             });
//         }
//     };
// };
