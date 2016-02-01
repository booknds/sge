import angular from "angular";
import textareaComponent from "./textareaInput.component";

let TextAreaModule = angular
    .module("TextAreaModule", [])
    .directive("sgTextarea", textareaComponent);

export default TextAreaModule;
