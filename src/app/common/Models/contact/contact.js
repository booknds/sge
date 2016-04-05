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
      state.props.find(getProp('name')).value = value;
    },

    set url(value) {
      state.props.find(getProp('url')).value = value;
    },

    set email(value) {
      state.props.find(getProp('email')).value = value;
    },

    isValid() {
      const propsAreValid =
        state.props
          .filter(props => !props.required && !!props.value)
          .every(prop => prop.isValid);

      return propsAreValid;
    },
  };

  return Object.assign(state, toSwagger(state.props));
};
