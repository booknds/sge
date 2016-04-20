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
export default function Property({ key, value = undefined, required = () => false, validIf = validate } = {}) {
  let _required = required;

  const state = {
    value,
    isValid() {
      return validIf(state.value);
    },
    getKey() {
      return key;
    },
    isRequired() {
      return _required();
    },
    setRequired(cb) {
      _required = cb;
    },
  };

  return state;
}
