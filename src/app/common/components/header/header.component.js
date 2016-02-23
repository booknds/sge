import template from "./header.html";

/**
 */
export default function headerComponent() {
    return {
        template,
        replace: true,
        restrict: "E"
    };
}
