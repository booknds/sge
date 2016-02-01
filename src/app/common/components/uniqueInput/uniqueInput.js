import angular from "angular";
import UniqueInput from "./uniqueInput.component";

let UniqueInputModule = angular
	.module("UniqueInputModule", [])
	.directive("sgUniqueInput", UniqueInput);

export default UniqueInputModule;
