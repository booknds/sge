import { requiredProps } from "../utils/helpers";

export default class License {
    constructor(name = "") {
        this.name = name;
        this.url = "";
        this._valid = false;
        
        return Object.assign(
            this,
            requiredProps("NAME")
        );
    }
    
    updateLicense([name, url = ""]) {
        this.name = name;
        this.url = url;       
    }
    
    toSwagger() {        
        return {
            name: this.name,
            url: this.url
        };
    }
}
