import Property from '../property/property';
import SchemaBase from '../schemaBase/schemaBase';
import { getProperty, toSwagger, createIsValid, getAllProps, combineProps } from '../utils/helpers';

/**
 * Items - A factory function to create Items Objects in accordance
 *                to the Swagger / OpenAPI specification
 *
 * @param  {String} type = '' the value for the Items Object's type property
 * @return {Object}           an Items Object
 */
export default function Items({ type = '' } = {}) {
  const schemaBase = SchemaBase();
  const typeProp = Property(
    { key: 'type',
    value: type,
    required: () => true });

  const itemsProp = Property({ key: 'items', required: () => (typeProp.value === 'array') });
  const props = combineProps(
    schemaBase.getAllProps(),
    [
      typeProp,
      itemsProp,
    ]);

  const stateMethods = {
    set(key, value) {
      getProperty(props, key).value = value;
    },

    setType(value) {
      getProperty(props, 'type').value = value;
    },

    createItemsProp(newType) {
      if (!!newType) {
        itemsProp.value = Items({ type: newType });
      } else {
        itemsProp.value = Items();
      }
    },
  };

  const completeState = Object.assign(
    {},
    schemaBase,
    toSwagger(props),
    createIsValid(props),
    getAllProps(props),
    stateMethods
  );

  return Object.freeze(completeState);
}
