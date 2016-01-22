"use strict";

import angular from 'angular';
import SchemaEditorComponent from "./schemaEditor.component";

let schemaEditorModule =
      angular.module("schemaEditor",[])
              .directive("sgSchemaEditor", SchemaEditorComponent);

export default schemaEditorModule;
