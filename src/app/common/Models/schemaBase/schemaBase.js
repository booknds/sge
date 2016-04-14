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
    Property('format'),
    Property('collectionFormat'),
    Property('default'),
    Property('maximum'),
    Property('exclusiveMaximum'),
    Property('minimum'),
    Property('exclusiveMinimum'),
    Property('maxLength'),
    Property('minLength'),
    Property('pattern'),
    Property('maxItems'),
    Property('minItems'),
    Property('uniqueItems'),
    Property('enum'),
    Property('multipleOf'),
  ];

  const completeState = Object.assign(
    {},
    getAllProps(props)
  );

  return Object.freeze(completeState);
}
