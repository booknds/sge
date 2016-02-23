import SchemaEditorCtrl from "./schemaEditor.controller";
import ObjectFactory from "./../../services/objectFactory.service.js";
import {expect} from "chai";
// var expect = require("chai").expect;

describe("SchemaEditorController", function() {

    var ctrl,
        factory;

    before(function() {
        factory = new ObjectFactory();
    });

    beforeEach(function() {
        ctrl = new SchemaEditorCtrl();
        ctrl.sgSchemaObject = factory.newSchema();
    });

    it("should add a new enum to the list", function addEnumTest() {
        let enumList = ctrl.sgSchemaObject.enum;

        ctrl.addEnum("1");

        expect(enumList).to.include("1");
    });

    it("should remove an existing enum from the list", function removeEnumTest() {
        let enumList = ctrl.sgSchemaObject.enum;

        ctrl.addEnum("1");
        ctrl.removeEnum("1");

        expect(enumList).to.have.length(0);
        expect(enumList).to.not.include("1");
    });

});
