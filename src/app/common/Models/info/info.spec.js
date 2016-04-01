import Info from "./info";
import {expect} from "chai";
import sinon from "sinon";


describe("Info object", function() {
    
    var info;
    
    before(function() {
        info = new Info(); 
    });
    
    describe("addLicense", function(){
        
        it("should add a license when there isnt one", function() {
            expect(info.license).to.be.null;
            info.addLicense();
            expect(info.license).to.not.be.null;
            expect(info.license).to.contain.keys(["name", "url"]);
        });
        
    });
    
    describe("RemoveLicense", function(){
        
        before(function() {
            info.addLicense();   
        });
        
        it("should remove a license", function() {
            expect(info.license).to.not.be.null;
            info.removeLicense();
            expect(info.license).to.be.null;
        });
        
    });
});
