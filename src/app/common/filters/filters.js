import angular from "angular";
import Capitalize from "./capitalize";

let filters = angular
    .module("filters", [])
    .filter("capitalize", Capitalize);

export default filters;
