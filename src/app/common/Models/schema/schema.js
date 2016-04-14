import Property from '../property/property';
import Items from '../items/items';
import
  {
    makeSetProperty,
    getProperty,
    toSwagger,
    createIsValid,
    getAllProps,
    combineProps,
  } from '../utils/helpers';

/**
 * createItems - A factory function to create Items Objects in accordance
 *                to the Swagger / OpenAPI specification
 *
 * @param  {String} type = '' the value for the Items Object's type property
 * @return {Object}           an Items Object
 */
export default function Schema() {
  const items = Items();
  const props = combineProps(items.getAllProps(),
    [
      Property('$ref'),
      Property('title'),
      Property('allOf'),
      Property('properties'),
      Property('additionalProperties'),
      Property('discriminator'),
      Property('readOnly'),
      Property('xml'),
      Property('externalDocs'),
      Property('example'),
    ]);

  const stateMethods = {
    setRef(value) {
      getProperty(props, '$ref').value = value;
    },
    setTitle(value) {
      getProperty(props, 'title').value = value;
    },
    setAllOf(value) {
      getProperty(props, 'allOf').value = value;
    },
    setProperties(value) {
      getProperty(props, 'properties').value = value;
    },
    setAdditionalProperties(value) {
      getProperty(props, 'additionalProperties').value = value;
    },
    setDiscriminator(value) {
      getProperty(props, 'discriminator').value = value;
    },
    setReadOnly(value) {
      getProperty(props, 'readOnly').value = value;
    },
    setXml(value) {
      getProperty(props, 'xml').value = value;
    },
    setExternalDocs(value) {
      getProperty(props, 'externalDocs').value = value;
    },
    setExample(value) {
      getProperty(props, 'example').value = value;
    },
  };

  const completeState = Object.assign(
    {},
    items,
    toSwagger(props),
    createIsValid(props),
    getAllProps(props),
    makeSetProperty(props),
    stateMethods
  );

  console.log(completeState);

  return Object.freeze(completeState);
}
