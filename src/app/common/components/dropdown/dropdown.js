import angular from "angular";
import dropdownComponent from "./dropdown.component";

let dropdownModule = angular
    .module("dropdown", [])
    .directive("sgDropdown", dropdownComponent);

export default dropdownModule;
