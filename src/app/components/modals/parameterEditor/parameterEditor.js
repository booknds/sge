import angular from "angular";
import ParameterEditorComponent from "./parameterEditor.component";
import ParameterEditorService from "./parameterEditor.service";

let ParameterEditorModule = angular
	.module("ParameterEditorModule", [])
	.directive("sgParameterEditorModal", ParameterEditorComponent)
	.factory("ParameterModalService", ParameterEditorService);

export default ParameterEditorModule;
