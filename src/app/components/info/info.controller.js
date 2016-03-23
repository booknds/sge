let infoCtrl = ["InfoService", InfoCtrl];

export default infoCtrl;

/**
 */
function InfoCtrl(InfoService) {

    this.state = {
        consume: null,
        customConsume: null,
        produce: null,
        customProduce: null,
        schema: null,
        customSchema: null
    };

    this.reset = reset;

    /**
      * @name InfoService
      * @desc A singleton module to hold Base definition state and manipulate it"s info.
      * @type {Function}
     **/
    this.sgBase = InfoService.getBaseInfo();

    /**
      * @name types
      * @desc holds arrays that define lists. These lists are the types allowed for the key.
      * @type {Obejct}
     **/
    this.types = {
        scheme: ["http", "https", "ws", "wws"],
        mime: ["create custom", "text/plain", "application/json", "text/xml", "application/xml", "application/atom+xml", "application/x-www-form-urlencoded"]
    };

    /**
      * @name addType
      * @desc invokes a call to the InfoService service to handle the logic of adding types.
      * @type {Function}
     **/
    this.addType = function addEvent(...args) {

        const list = args[0];
        const type = args[1];
        const resetDropdown = args[2];

        InfoService.addType(list, type);

        if (resetDropdown) {
            reset.call(this, list);
        }
    };

    /**
      * @name removeType
      * @desc invokes a call to the InfoService service to handle the logic of removing types.
      * @type {Function}
     **/
    this.removeType = function removeEvent(list, type) {
        InfoService.removeType(list, type);

    };

    /**
     *
     * @param list
     */
    function reset(list) {
        switch (list) {
        case "consumes":
            this.state.consume = null;
            this.state.customConsume = "";
            break;
        case "produces":
            this.state.produce = null;
            this.state.customProduce = "";
            break;
        case "schemes":
            this.state.scheme = null;
            this.state.customScheme = "";
            break;
        default:
            this.state = {
                consume: null,
                customConsume: null,
                produce: null,
                customProduce: null,
                schema: null,
                customSchema: null
            };

        }
    }

}
