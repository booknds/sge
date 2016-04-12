import createProperty from '../property/property';
import Items from '../items/items';
import SchemaBase from 'jsonSchema/jsonSchemaBase';
import { getProperty, toSwagger, createIsValid, getAllProps } from '../utils/helpers';
import { flatten } from 'lodash';

/**
 * createItems - A factory function to create Items Objects in accordance
 *                to the Swagger / OpenAPI specification
 *
 * @param  {String} type = '' the value for the Items Object's type property
 * @return {Object}           an Items Object
 */
export default function Schema() {
  const schemaBase = SchemaBase();
  const props = flatten(SchemaBase.getAllProps(), [
    createProperty('type'),
    createProperty('items', null, itemsRequiredCondionally, checkItemsObjectValidity),
    createProperty('$ref'),
    createProperty('title'),
    createProperty('allOf'),
    createProperty('properties'),
    createProperty('additionalProperties'),
    createProperty('discriminator'),
    createProperty('readOnly'),
    createProperty('xml'),
    createProperty('externalDocs'),
    createProperty('example')
  ]);

  const stateMethods = {
    setType(value) {
      getProperty(props, 'multipleOf').value = value;
    },
    setRef(value) {
      getProperty(props, 'multipleOf').value = value;
    },
    setTitle(value) {
      getProperty(props, 'multipleOf').value = value;
    },
    setAllOf(value) {
      getProperty(props, 'multipleOf').value = value;
    },
    setProperties(value) {
      getProperty(props, 'multipleOf').value = value;
    },
    setAdditionalProperties(value) {
      getProperty(props, 'multipleOf').value = value;
    },
    setDiscriminator(value) {
      getProperty(props, 'multipleOf').value = value;
    },
    setReadOnly(value) {
      getProperty(props, 'multipleOf').value = value;
    },
    setXml(value) {
      getProperty(props, 'multipleOf').value = value;
    },
    setExternalDocs(value) {
      getProperty(props, 'multipleOf').value = value;
    },
    setExample(value) {
      getProperty(props, 'multipleOf').value = value;
    },
    createItemsProp(newType) {
      const itemsProp = getProperty(props, 'items');

      if (!!newType) {
        itemsProp.value = Items(newType);
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
