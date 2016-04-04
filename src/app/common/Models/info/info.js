// import { requiredProps } from '../utils/helpers';
import createLicense from '../license/license';
// import createContact from '../contact/contact';

const validate = (value) => {
    if (value === null) {
        return false;
    }

    switch (typeof value) {
    case 'object':
        return value.isValid();
    case 'array':
        return value.length ? true : false;
    default:
        return value ? true : false;
    }
};

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

export default (title = '', version = '') => {
    const props = [
        property('title', title, true),
        property('version', version, true),
        property('description', null),
        property('termsOfService', null),
        property('contact', null),
        property('license', null),
    ];
    
    /**
     * Helper functions
     * could be converted to helper methods
     */
    const validInfoObject = prop => prop.isValid;
    const getProp = 
        name => 
            prop => prop.key === name;

    /**
     * info API methods
     */
    const isValid = () => {
        props.every(validInfoObject); 
    };
    const addLicense = () => {
        const license = props.find(getProp('license'));
        license.value = license.value || createLicense();
    };
    const removeLicense = () => {
        const license = props.find(getProp('license'));
        license.value = null;
    };
    const toSwagger = () => ( 
        props.filter(validInfoObject)
            .reduce((minimalInfo, prop) => {
                const minimal = minimalInfo;
                minimal[prop.key] = prop.value;
                return minimal;    
            }, {})
    );
    
    return {
        props,
        isValid,
        addLicense,
        removeLicense,
        toSwagger,
    };
};
