/**
 */
export default function OperationCtrl() {

    this.types = {
        scheme: ["http", "https", "ws", "wws"],
        mime: ["create custom", "text/plain", "application/json", "text/xml", "application/xml", "application/atom+xml", "application/x-www-form-urlencoded"]
    };

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
      * @name addType
      * @desc invokes a call to handle the logic of adding types.
      * @type {Function}
     **/
    this.addType = function addEvent(...args) {

        const list = args[0];
        const type = args[1];
        const resetDropdown = args[2];

        this.operationObj.addType(list, type);

        if (resetDropdown) {
            reset.call(this, list);
        }

    }.bind(this);

    /**
      * @name removeType
      * @desc invokes a call to handle the logic of removing types.
      * @type {Function}
     **/
    this.removeType = function removeEvent(list, type) {
        this.operationObj.removeType(list, type);

    }.bind(this);

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
