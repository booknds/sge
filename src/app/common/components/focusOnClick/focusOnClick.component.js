// directive based on Mark Rajcok"s answer on stack overflow to focus an elemenet on button click event.

let FocusOnClick = ["$timeout", "$parse", FocusOnClickCtrl];

export default FocusOnClick;

/**
 */
function FocusOnClickCtrl($timeout, $parse) {
    return {
        // scope: true,   // optionally create a child scope
        link: function(scope, element, attrs) {
            // get the attribute on the element called focus-me and put its value into model
            var model = $parse(attrs.focusMe);

            // watch whenever model changes, if it true, the pop up modal was activated and should focus on the input
            scope.$watch(model, function(value) {
                // $log.log("value=",value);
                if (value === true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });

            // to address @blesh"s comment, set attribute value to "false"
            // on blur event:
            element.bind("blur", function() {
                // $log.log("blur");
                scope.$apply(model.assign(scope, false));
            });
        }
    };
}
