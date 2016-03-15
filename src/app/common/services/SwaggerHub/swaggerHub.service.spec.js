import { expect } from "chai";
import SwaggerHub from "./swaggerHub.service";

describe("SwaggerHubService", function() {

    xdescribe("getApi", function() {

        var swaggerHub,
            apiMetaData;

        before(function() {
            swaggerHub = new SwaggerHub();
            apiMetaData = {
                owner: "hkmconsultingllc",
                api: "Person",
                version: "v1"
            };
        });


        it("should get one valid api from SwaggerHub", function() {
            expect(swaggerHub, apiMetaData);
        });


    });

    describe("postApi", function() {
    });

});
