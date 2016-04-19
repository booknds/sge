import Property from '../property/property';
import { getAllProps } from '../utils/helpers';

/**
 *  SchemaBase - A factory function to create a basic JSON Schema Object in accordance
 *                to the Swagger / OpenAPI specification. Will be used to compose
 *                other Swagger / OpenAPI objects.
 *
 * @return {Object} - a SchemaBaseObject
 */
export default function SchemaBase() {
  const props = [
    Property({ key: 'format' }),
    Property({ key: 'collectionFormat' }),
    Property({ key: 'default' }),
    Property({ key: 'maximum' }),
    Property({ key: 'exclusiveMaximum' }),
    Property({ key: 'minimum' }),
    Property({ key: 'exclusiveMinimum' }),
    Property({ key: 'maxLength' }),
    Property({ key: 'minLength' }),
    Property({ key: 'pattern' }),
    Property({ key: 'maxItems' }),
    Property({ key: 'minItems' }),
    Property({ key: 'uniqueItems' }),
    Property({ key: 'enum' }),
    Property({ key: 'multipleOf' }),
  ];

  const completeState = Object.assign(
    {},
    getAllProps(props)
  );

  return Object.freeze(completeState);
}
