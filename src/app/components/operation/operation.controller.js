/**
 */
export default function OperationCtrl() {

    this.types = {
        scheme: ["http", "https", "ws", "wws"],
        mime: ["text/plain; charset=utf-8", "application/json", "application/vnd.github+json", "application/vnd.github.v3+json", "application/vnd.github.v3.raw+json", "application/vnd.github.v3.text+json", "application/vnd.github.v3.html+json", "application/vnd.github.v3.full+json", "application/vnd.github.v3.diff", "application/vnd.github.v3.patch"]
    };

    /**
      * @name addType
      * @desc invokes a call to handle the logic of adding types.
      * @type {Function}
     **/
    this.addType = function addEvent(list, type) {
        this.operationObj.addType(list, type);

    }.bind(this);

    /**
      * @name removeType
      * @desc invokes a call to handle the logic of removing types.
      * @type {Function}
     **/
    this.removeType = function removeEvent(list, type) {
        this.operationObj.removeType(list, type);

    }.bind(this);


}
