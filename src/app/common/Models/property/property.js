import { validate } from '../utils/helpers';

/**
 * createProperty - factory function;
 *
 * @param  {string} key - name of the property
 * @param  {any} value - value of the property
 * @param  {Function} required=anonymous function -
 *              A function to determine if the property is required;
 * @param  {Function} fn=validate - a function to validate the property.
 *
 * @return {Object} - a property object
 */
export default (key, value = undefined, required = () => false, fn = validate) => {
  const _key = key;
  const _required = required;

  const state = {
    value,
    isValid() {
      return fn(state.value);
    },
    getKey() {
      return _key;
    },
    isRequired() {
      return _required();
    },
  };

  return state;
};
