

export default class Path {
    constructor() {
        let state = {
            $ref: "",
            get: null,
            post: null,
            put: null,
            delete: null,
            options: null,
            head: null,
            patch: null,
            parameters: null        
        };
        
        return Object.assign(
            {},
            state
        );
    }
}
