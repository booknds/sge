import { getProp, toSwagger } from '../utils/helpers';
import property from '../property/property.js';

export default (name = '') => {
  const state = {

    props: [
      property('name', name, () => true),
      property('url', null),
    ],

    set name(value) {
      state.props.find(getProp('name')).value = value;
    },

    set url(value) {
      state.props.find(getProp('url')).value = value;
    },

    get isValid() {
      const requiredPropsAreValid =
        state.props
          .filter(prop => prop.required)
          .every(prop => prop.isValid);

      if (!requiredPropsAreValid) {
        return requiredPropsAreValid;
      }

      const remainingPropsAreValid =
        state.props
          .filter(props => !props.required && !!props.value)
          .every(prop => prop.isValid);

      return remainingPropsAreValid;
    },
  };

  return Object.assign(state, toSwagger(state.props));
};

/**
 * OLOO Pattern
 *
const License = {
  init(name = '') {
    this.props = [
      property('name', name, true),
      property('url', null),
    ];
  },
  set name(value) {
    this.props.find(prop => prop.name === "name" ).value = value;
  },
  set url(value) {
    this.props.find(getProp('url')).value = value;
  },
  get isValid() {
    const requiredPropsAreValid =
      this.props
        .filter(prop => prop.required)
        .every(prop => prop.isValid);

    if (!requiredPropsAreValid) {
      return requiredPropsAreValid;
    }

    const remainingPropsAreValid =
      this.props
        .filter(props => !props.required && !!props.value)
        .every(prop => prop.isValid);

    return remainingPropsAreValid;
  },
};

const createLicense = (name) => {
  let tmp = Object.create(License);
  tmp.init(name);
  return tmp;
}

export default createLicense;
*/
