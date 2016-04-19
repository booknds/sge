import Property from '../property/property.js';
import { toSwagger, makeSetProperty, getAllProps } from '../utils/helpers';

/**
 * @return {Object} - a contact object as per the OpenAPI specification
 */
export default () => {
  const props =
    [
      Property({ key: 'name' }),
      Property({ key: 'url' }),
      Property({ key: 'email' }),
    ];

  const stateMethods = {
    isValid() {
      const propsAreValid =
        props
          .filter(prop => prop.value)
          .every(prop => prop.isValid());

      return propsAreValid;
    },
  };

  const completeState = Object.assign(
    toSwagger(props),
    makeSetProperty(props),
    getAllProps(props),
    stateMethods
  );

  return Object.freeze(completeState);
};
