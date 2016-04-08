import createProperty from '../property/property';
import { getProperty } from '../utils/helpers';

export default function createItems(type = '') {
  const state = {
    props: [
      createProperty('type', type, true),
      createProperty('items', null, () => (getProperty(state.props, 'type').value === 'array')),
      createProperty('format'),
      createProperty('collectionFormat'),
      createProperty('default'),
      createProperty('maximum'),
      createProperty('exclusiveMaximum'),
      createProperty('minimum'),
      createProperty('exclusiveMinimum'),
      createProperty('maxLength'),
      createProperty('minLength'),
      createProperty('pattern'),
      createProperty('maxItems'),
      createProperty('minItems'),
      createProperty('uniqueItems'),
      createProperty('enum'),
      createProperty('mulitpleOf'),
    ],

    // experimental set for any
//     setPropValue(propType, newValue) {
//       if(propType === 'items') {
//         let itemProp = getProper
//       }
//       getProperty(state.props, propType).value = newValue;
//     },
//
    set type(value) {
      getProperty(state.props, 'type').value = value;
    },

    set format(value) {
      getProperty(state.props, 'format').value = value;
    },

    set collectionFormat(value) {
      getProperty(state.props, 'collectionFormat').value = value;
    },

    set default(value) {
      getProperty(state.props, 'default').value = value;
    },

    set maximum(value) {
      getProperty(state.props, 'maximum').value = value;
    },

    set exclusiveMaximum(value) {
      getProperty(state.props, 'exclusiveMaximum').value = value;
    },

    set minimum(value) {
      getProperty(state.props, 'minimum').value = value;
    },

    set exclusiveMinimum(value) {
      getProperty(state.props, 'exclusiveMinimum').value = value;
    },

    set maxLength(value) {
      getProperty(state.props, 'maxLength').value = value;
    },

    set minLength(value) {
      getProperty(state.props, 'minLength').value = value;
    },

    set pattern(value) {
      getProperty(state.props, 'pattern').value = value;
    },

    set maxItems(value) {
      getProperty(state.props, 'maxItems').value = value;
    },

    set minItems(value) {
      getProperty(state.props, 'minItems').value = value;
    },

    set uniqueItems(value) {
      getProperty(state.props, 'uniqueItems').value = value;
    },

    set enum(value) {
      getProperty(state.props, 'enum').value = value;
    },

    set multipleOf(value) {
      getProperty(state.props, 'multipleOf').value = value;
    },

    set items(value) {
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

  return state;
}
