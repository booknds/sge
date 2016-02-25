import {DefinitionCreationCtrl} from "./definitionCreator.controller";
import ObjectFactory from "./../../../common/services/objectFactory.service.js";
import {DefinitionsService} from "./../../../common/services/definitions.service.js";
import {expect} from "chai";

describe("DefinitionCreatorController", function() {

    describe("adding definition", function() {

        var ctrl,
            factory,
            service;

        before(function() {
            factory = new ObjectFactory();
        });

        beforeEach(function() {
            service = new DefinitionsService(factory);
            ctrl = new DefinitionCreationCtrl(service, {hide: function() {
                return;
            } });
        });

        it("should add a definition to definitionsList", function addEnumTest() {

            let definitionName = "Account";
            let description = "A persons bank account";

            ctrl.addDefinition(definitionName, description);

            let definitions = service.getDefinitions();

            expect(definitions.hasOwnProperty("Account")).to.be.true;
            expect(definitions.Account.description).to.equal("A persons bank account");
            expect(definitions.Account.type).to.equal("object");

        });

    });

});
