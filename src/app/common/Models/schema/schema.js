import createProperty from '../property/property';
import Items from '../items/items';
import SchemaBase from '../schemaBase/schemaBase';
import { getProperty, toSwagger, createIsValid, getAllProps, combineProps } from '../utils/helpers';

/**
 * createItems - A factory function to create Items Objects in accordance
 *                to the Swagger / OpenAPI specification
 *
 * @param  {String} type = '' the value for the Items Object's type property
 * @return {Object}           an Items Object
 */
export default function Schema() {
  const schemaBase = SchemaBase();
  const props = combineProps(schemaBase.getAllProps(), [
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
    createProperty('example'),
  ]);

  const stateMethods = {
    setType(value) {
      getProperty(props, 'type').value = value;
    },
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
  // return completeState;

/* ///////////////////////////////////////////////////////
   * Helper Functions /////////////////////////////////////
   ///////////////////////////////////////////////////// */

  /**
   * validItemsProperty - custom validator for Items Object's items property
   *
   * @return {boolean} - returns true if items property is not null and is itself valid
   */
  function checkItemsObjectValidity() {
    const itemsProp = getProperty(props, 'items');
    if (itemsProp.value) {
      return itemsProp.value.isValid();
    }

    return false;
  }

  /**
   * itemsRequiredCondionally - the items property is required by the
   *    Items object conditioned upon the type property's value
   *
   * @return {boolean} - returns true if the type proerty is 'array'
   */
  function itemsRequiredCondionally() {
    return getProperty(props, 'type').value === 'array';
  }
}
