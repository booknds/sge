import { getProp, toSwagger } from '../utils/helpers';
import property from '../property/property.js';

/**
 * @return {Object} - a contact object as per the OpenAPI specification
 */
export default () => {
  const state = {
    props: [
      property('name'),
      property('url'),
      property('email'),
    ],

    set name(value) {
      state.props.find(getProp('name')).value = value || null;
    },

    set url(value) {
      state.props.find(getProp('url')).value = value || null;
    },

    set email(value) {
      state.props.find(getProp('email')).value = value || null;
    },

    get isValid() {
      const propsAreValid =
        state.props
          .filter(props => props.value !== null)
          .every(prop => prop.isValid);

      return propsAreValid;
    },
  };

  return Object.assign(
    state,
    toSwagger(state.props));
};
