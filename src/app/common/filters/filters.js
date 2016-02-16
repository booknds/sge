import angular from "angular";
import Capitalize from "./capitalize";
import RemoveEmpty from "./removeEmpty";

let filters = angular
    .module("filters", [])
    .filter("capitalize", Capitalize)
    .filter("removeEmpty", RemoveEmpty);

export default filters;
