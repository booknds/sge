import { requiredProps } from "../utils/helpers";
import License from "../license/license";
import Contact from "../contact/contact";

const validate = () => {
    if (this.value === null) {
        return false;
    }
    
    switch (typeof this.value) {
        case "object":
            return this.value.isValid();
        case "array":
            return (this.value.length) ? true : false;
        default:
            return this.value ? true: false;
    }
};

export default class Info {
    
    constructor(title = "", version = "") {
        let state = {
            title, 
            version,
            description: null,
            termsOfService: null,
            contact: null,
            license: null
        };
        
        this.props = [
            {
                key: "title",
                value: title,
                required: true,
                get isValid() {
                    return validate.call(this);
                }  
            },
            {
                key: "version",
                value: version,
                required: true,
                get isValid() {
                    return validate.call(this);
                }  
            },
            {
                key: "description",
                value: null,
                required: false,
                get isValid() {
                    return validate.call(this);
                }  
            },
            {
                key: "termsOfService",
                value: termsOfService,
                required: false,
                get isValid() {
                    return validate.call(this);
                }  
            },
            {
                key: "contact",
                value: contact,
                required: false,
                get isValid() {
                    return validate.call(this);
                }  
            },
            {
                key: "license",
                value: license,
                required: false,
                get isValid() {
                    return validate.call(this);
                }  
            }
        ]
        
        return Object.assign(
            this, 
            state,
            requiredProps({ 
                key: "title", 
                type: "primative", 
                required: true 
            }, 
            {   
                key: "version", 
                type: "primative",
                required: true
             })
        );
    }
    
    addLicense() {
        this.license = new License();
    }
    
    removeLicense() {
        this.license = null;
    }
    
    isValid() {
        return (this.title && this.version);
    }
    
    toSwagger() {
        
        /**
         * add required props
         */
        let requiredProps = this._required;
        let primativeProps = [ "description", "contract", "termsOfService" ];
        let advancedProps = [ "contact", "license" ];
        
        primativeProps.forEach( prop => {
            if (this[prop])
        })
        
        let has = {
            contact: this.contact.isValid(),
            license: this.license.isValid()
        };
                
            
        const validProps = [""];
        
        return {
            title: this.title,
            version: this.version,
            description: this.description,
            termsOfService: this.termsOfService,
            contact: this.contact.toSwagger(),
            license: this.license.toSwagger()
        };
    }
       
}
