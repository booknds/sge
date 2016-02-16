export default callback;

function callback(){
    return function removeEmpty(obj) {
        // debugger;

        if (typeof obj !== "object") {
            return;
        }

        let cleaned = {};

        for (var key in obj) {

            if (obj[key] !== null) {

                switch(typeof obj[key]){
                case "object":
                    if (Object.keys(obj[key]) > 0) {
                        removeEmpty(obj[key]);
                    }
                    break;
                case "array":
                    if (obj[key].length > 0) {
                        cleaned[key] = obj[key];
                    }
                    break;
                default:
                    if (obj[key] !== "" && angular.isDefined(obj[key])) {
                        cleaned[key] = obj[key];
                    }

                }
            }
            
            
        }

        return cleaned;
    };
}
