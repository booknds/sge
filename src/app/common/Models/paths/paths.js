import { requiredProps } from "../utils/helpers";
import Path from "../path/path.js";

export default class Paths {
    constructor() {
        let state = {
            pathsList: []
        };
        
        return Object.assign(
            {},
            this,
            requiredProps("NOT EMPTY"));
    }
    
    addPath(pathName, isRef) {
        if ( isRef ) {
            this.pathsList.push(["$ref", pathName]);
        } else {
            this.pathsList.push(["pathName", new Path()]);
        }
    }
    
    removePath(pathName) {
        this.pathList = this.pathList.filter((path) => path[0] !== pathName );
    }    
    
    toSwagger() {
        let paths = {};
        
        this.pathsList.forEach( path => {
            let pathName = path[0];
            let pathValue = path[1];
            paths[pathName] = pathValue;
        });
        
        return paths;
    }
    
}
