// import { requiredProps } from "../utils/helpers";

const property = (key, value, required = false) => (
    {
        key,
        value,
        required,
        get isValid() {
            return validate(value);
        },
    }
);

const getProp = 
        name => 
            prop => prop.key === name;
            
const toSwagger = () => ( 
        props.filter(validInfoObject)
            .reduce((minimalInfo, prop) => {
                const minimal = minimalInfo;
                minimal[prop.key] = prop.value;
                return minimal;    
            }, {})
    );

export default (name = '') => {
    const props = [
        property('name', name, true),
        property('url', null),
    ];
    
    const updateLicense = (license, url = '') => {
        props.find(getProp('name')).value = license;
        props.find(getProp('url')).value = url;
    };
    
    return Object.assign({}, { toSwagger }, 
        {
            props,
            updateLicense, 
        }
    );
};

export class License {
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
            url: this.url,
        };
    }
}
