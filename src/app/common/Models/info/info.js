import license from '../license/license';
import contact from '../contact/contact';
import property from '../property/property';
import {
  getProperty,
  getAllProps,
  makeSetProperty,
  createIsValid,
  toSwagger,
} from '../utils/helpers';

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

  const props = [
    property('title', title, () => true),
    property('version', version, () => true),
    property('description'),
    property('termsOfService'),
    property('contact'),
    property('license'),
  ];

  const stateMethods = {

    // set title(value) {
    //   state.props.find(getProp('title')).value = value;
    // },

    // set version(value) {
    //   state.props.find(getProp('version')).value = value;
    // },

    // set description(value) {
    //   state.props.find(getProp('description')).value = value || null;
    // },

    // set termsOfService(value) {
    //   state.props.find(getProp('termsOfService')).value = value || null;
    // },

    addObjectProp(propName) {
      const objectProp = getProperty(props, propName);
      objectProp.value = objectProp.value || factories[propName]();
    },

    removeObjectProp(propName) {
      const objectProp = getProperty(props, propName);
      objectProp.value = undefined;
    },

    // isValid() {
    //   const requiredPropsAreValid = state.props
    //     .filter(prop => prop.isRequired())
    //     .every(prop => prop.isValid());

    //   const restAreValid = state.props
    //     .filter(prop => !prop.isRequired() && prop.value !== null)
    //     .every(prop => prop.isValid());

    //   return (requiredPropsAreValid && restAreValid);
    // },
  };

  const completeState = Object.assign(
    toSwagger(props),
    makeSetProperty(props),
    getAllProps(props),
    createIsValid(props),
    stateMethods
  );

  return Object.freeze(completeState);
};
