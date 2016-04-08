import license from '../license/license';
import contact from '../contact/contact';
import property from '../property/property';
import { getProp, toSwagger } from '../utils/helpers';

/**
 * Info Object Factory
 *
 * @param  {string} title='' - title of the swagger document
 * @param  {string} version='' - version of the swagger document
 */
export default (title = 'My Api', version = 'v1') => {
  const factories = {
    license,
    contact,
  };

  const state = {
    props: [
      property('title', title, () => true),
      property('version', version, () => true),
      property('description', null),
      property('termsOfService', null),
      property('contact', null),
      property('license', null),
    ],

    set title(value) {
      state.props.find(getProp('title')).value = value;
    },

    set version(value) {
      state.props.find(getProp('version')).value = value;
    },

    set description(value) {
      state.props.find(getProp('description')).value = value || null;
    },

    set termsOfService(value) {
      state.props.find(getProp('termsOfService')).value = value || null;
    },

    addObjectProp(propName) {
      const objectProp = state.props.find(getProp(propName));
      objectProp.value = objectProp.value || factories[propName]();
    },

    removeObjectProp(propName) {
      const objectProp = state.props.find(getProp(propName));
      objectProp.value = null;
    },

    get isValid() {
      const requiredPropsAreValid = state.props
        .filter(prop => prop.required)
        .every(prop => prop.isValid);

      const restAreValid = state.props
        .filter(prop => !prop.required && prop.value !== null)
        .every(prop => prop.isValid);

      return (requiredPropsAreValid && restAreValid);
    },
  };

  return Object.assign(
    state,
    toSwagger(state.props)
  );
};
