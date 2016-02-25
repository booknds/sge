import SchemaEditorCtrl from "./schemaEditor.controller";
import ObjectFactory from "./../../services/objectFactory.service.js";
import {expect} from "chai";

describe("SchemaEditorController", function() {

    var ctrl,
        factory;

    before(function() {
        factory = new ObjectFactory({confirm: function() {
            return true;
        }});
    });

    beforeEach(function() {
        ctrl = new SchemaEditorCtrl();
        ctrl.sgSchemaObject = factory.newSchema();
    });

    describe("configure properties", function() {
        var properties,
            property;

        beforeEach(function() {
            properties = ctrl.sgSchemaObject.properties;
            property = "name";
        });

        it("should add new properties", function() {

            expect(properties.hasOwnProperty(property)).to.be.false;

            ctrl.addProperty(property);

            expect(properties.hasOwnProperty(property)).to.be.true;
        });

        it("should remove a specific property", function() {

            ctrl.addProperty(property);
            expect(properties.hasOwnProperty(property)).to.be.true;

            ctrl.deleteProperty(property);
            expect(properties.hasOwnProperty(property)).to.be.false;
        });


    });

    describe("modify a property's enum list", function() {

        var enumList;

        beforeEach(function() {
            ctrl.addProperty("name");
            enumList = ctrl.sgSchemaObject.properties.name.enum;
        });

        afterEach(function() {
            ctrl.deleteProperty("name");
        });

        it("should add a new enum to the list", function addEnumTest() {

            ctrl.addEnumToProperty("name", "1");
            expect(enumList).to.include("1");
        });

        it("should remove an existing enum from the list", function removeEnumTest() {

            ctrl.addEnumToProperty("name", "1");
            ctrl.removeEnumFromProperty("name", "1");

            expect(enumList).to.have.length(0);
            expect(enumList).to.not.include("1");
        });
    });

});
