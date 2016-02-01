import angular from "angular";
import DefinitionEditorComponent from "./definitionEditor.component";
import DefinitionEditorService from "./definitionEditor.service";

let DefinitionEditorModule = angular
    .module("DefinitionEditorModule", [])
    .directive("sgDefinitionEditorModal", DefinitionEditorComponent)
    .factory("DefinitionEditorModalService", DefinitionEditorService);

export default DefinitionEditorModule;
