import Property from '../property/property';
import Schema from '../schema/schema';
import {
  getAllProps,
  toSwagger,
  createIsValid,
  getProperty,
  makeAddObjectProp,
  makeRemoveObjectProp,
  } from '../utils/helpers';

/**
 * Response - factory function to create Response objects
 *
 * @return {type}  a response Object
 */
export default function Response() {
  const factories = {
    schema: Schema,
    headers: 'TODO',
    examples: 'TODO',
  };

  const props = [
    Property('description', undefined, () => true),
    Property('schema'),
    Property('headers'),
    Property('examples'),
  ];

  const methods = {
    setDescription(value) {
      getProperty(props, 'description').value = value;
    },
  };

  const completeState = Object.assign(
    {},
    getAllProps(props),
    toSwagger(props),
    createIsValid(props),
    makeAddObjectProp(props, factories),
    makeRemoveObjectProp(props, factories),
    methods
  );

  return Object.freeze(completeState);
}
