import { validate } from '../utils/helpers';

/**
 * @param  {string} key - name of the property
 * @param  {any} value - value of the property
 * @param  {boolean} required=false - if this is a required property
 * @param  {Function} fn=validate - a function to validate the property.
 * @return {Object} - a property object
 */
export default (name, value = null, required = false, fn = validate) => {
  const _name = name;
  const _required = required;

  const state = {
    value,
    get isValid() {
      return fn(state.value);
    },
    get name() {
      return _name;
    },
    get required() {
      return _required;
    },
  };

  return state;
};
