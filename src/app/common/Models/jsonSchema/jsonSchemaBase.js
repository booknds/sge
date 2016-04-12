import createProperty from '../property/property';
import { getProperty, getAllProps } from '../utils/helpers';

/**
 *  SchemaBase - A factory function to create a basic JSON Schema Object in accordance
 *                to the Swagger / OpenAPI specification. Will be used to build on
 *                by other Swagger Objects
 *
 * @return {Object} - a SchemaBaseObject
 */
export default function SchemaBase() {
  const props = [
    createProperty('format'),
    createProperty('collectionFormat'),
    createProperty('default'),
    createProperty('maximum'),
    createProperty('exclusiveMaximum'),
    createProperty('minimum'),
    createProperty('exclusiveMinimum'),
    createProperty('maxLength'),
    createProperty('minLength'),
    createProperty('pattern'),
    createProperty('maxItems'),
    createProperty('minItems'),
    createProperty('uniqueItems'),
    createProperty('enum'),
    createProperty('mulitpleOf'),
  ];

  const stateMethods = {
    setFormat(value) {
      getProperty(props, 'format').value = value;
    },

    setCollectionFormat(value) {
      getProperty(props, 'collectionFormat').value = value;
    },

    setDefault(value) {
      getProperty(props, 'default').value = value;
    },

    setMaximum(value) {
      getProperty(props, 'maximum').value = value;
    },

    setExclusiveMaximum(value) {
      getProperty(props, 'exclusiveMaximum').value = value;
    },

    setMinimum(value) {
      getProperty(props, 'minimum').value = value;
    },

    setExclusiveMinimum(value) {
      getProperty(props, 'exclusiveMinimum').value = value;
    },

    setMaxLength(value) {
      getProperty(props, 'maxLength').value = value;
    },

    setMinLength(value) {
      getProperty(props, 'minLength').value = value;
    },

    setPattern(value) {
      getProperty(props, 'pattern').value = value;
    },

    setMaxItems(value) {
      getProperty(props, 'maxItems').value = value;
    },

    setMinItems(value) {
      getProperty(props, 'minItems').value = value;
    },

    setUniqueItems(value) {
      getProperty(props, 'uniqueItems').value = value;
    },

    setEnum(value) {
      getProperty(props, 'enum').value = value;
    },

    setMultipleOf(value) {
      getProperty(props, 'multipleOf').value = value;
    },
  };

  return Object.assign(
    getAllProps(props),
    stateMethods
  );
}
