"use strict";

let infoCtrl = ["$log", "InfoService", BaseInfoCtrl];

export default infoCtrl;

function BaseInfoCtrl($log, InfoService){

    /**
      * @name InfoService
      * @desc A singleton module to hold Base definition state and manipulate it"s info.
      * @type {Function}
     **/
    this.sgBase = InfoService.getBaseInfo();

    // $scope.$watch(InfoService.getBaseInfo, function(newVal) {
    //   if(newVal){
    //     debugger;
    //     console.log(newVal);
    //     this.sgBase = InfoService.getBaseInfo();
    //   }
    // }, true)

    /**
      * @name types
      * @desc holds arrays that define lists. These lists are the types allowed for the key.
      * @type {Obejct}
     **/
    this.types = {
        scheme: ["http", "https", "ws", "wws"],
        mime:   ["text/plain; charset=utf-8", "application/json", "application/vnd.github+json",
                        "application/vnd.github.v3+json", "application/vnd.github.v3.raw+json",
                        "application/vnd.github.v3.text+json", "application/vnd.github.v3.html+json",
                        "application/vnd.github.v3.full+json", "application/vnd.github.v3.diff",
                        "application/vnd.github.v3.patch"]
    };

    /**
      * @name addType
      * @desc invokes a call to the InfoService service to handle the logic of adding types.
      * @type {Function}
     **/
    this.addType = function addEvent(list, type){
        try {
            InfoService.addType(list, type);
        } catch (e) {
            $log.log(e);
            Materialize.toast(e, 3000);
        }
    };

    /**
      * @name removeType
      * @desc invokes a call to the InfoService service to handle the logic of removing types.
      * @type {Function}
     **/
    this.removeType = function removeEvent(list, type){
        try {
            InfoService.removeType(list, type);
        } catch (e) {
            $log.log(e);
            Materialize.toast(e, 3000);
        }
    };

}
