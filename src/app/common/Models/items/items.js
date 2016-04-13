import createProperty from '../property/property';
import SchemaBase from '../schemaBase/schemaBase';
import { getProperty, toSwagger, createIsValid, getAllProps, combineProps } from '../utils/helpers';

/**
 * createItems - A factory function to create Items Objects in accordance
 *                to the Swagger / OpenAPI specification
 *
 * @param  {String} type = '' the value for the Items Object's type property
 * @return {Object}           an Items Object
 */
export default function createItems(type = '') {
  const schemaBase = SchemaBase();
  const props = combineProps(
    schemaBase.getAllProps(),
    [
      createProperty('type', type, () => true),
      createProperty('items', null, itemsRequiredCondionally, checkItemsObjectValidity),
    ]);

  const stateMethods = {
    setType(value) {
      getProperty(props, 'type').value = value;
    },

    createItemsProp(newType) {
      const itemsProp = getProperty(props, 'items');

      if (!!newType) {
        itemsProp.value = createItems(newType);
      } else {
        itemsProp.value = createItems();
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
