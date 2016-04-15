import Property from '../property/property';
import Schema from '../schema/schema';
import SchemaBase from '../schemaBase/schemaBase';
import { combineProps, toSwagger, createIsValid, getProperty } from '../utils/helpers';

/**
 *
 */
export default function Parameter() {
  const schemaProps = Schema().getAllProps();
  const inProp = Property('in', undefined, () => true);
  const
  const props =
    [
      Property('name', undefined, () => true),
      inProp,
      Property('description'),
      Property('required'),
      Property('schema', undefined, () => inProp.value === 'body'),
    ];

  const stateMethods = {
    setName(value) {
      getProperty(props, 'name').value = value;
    },

    setIn(value) {
      getProperty(props, 'in').value = value;

      if (value === 'body') {
        getProps
      }
    },
  };

  const completeState = Object.assign(
    {},
    toSwagger(props),
    createIsValid(props),
    stateMethods
  );

  return Object.freeze(completeState);
}
