import createProperty from '../property/property';
import { getProperty, toSwagger, createIsValid } from '../utils/helpers';

/**
 * createItems - A factory function to create Items Objects in accordance
 *                to the Swagger / OpenAPI specification
 *
 * @param  {String} type = '' the value for the Items Object's type property
 * @return {Object}           an Items Object
 */
export default function createItems(type = '') {
  const state = {
    props: [
      createProperty('type', type, () => true),
      createProperty('items', null, itemsRequiredCondionally, validItemsProperty),
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
    ],

    setType(value) {
      getProperty(state.props, 'type').value = value;
    },

    setFormat(value) {
      getProperty(state.props, 'format').value = value;
    },

    setCollectionFormat(value) {
      getProperty(state.props, 'collectionFormat').value = value;
    },

    setDefault(value) {
      getProperty(state.props, 'default').value = value;
    },

    setMaximum(value) {
      getProperty(state.props, 'maximum').value = value;
    },

    setExclusiveMaximum(value) {
      getProperty(state.props, 'exclusiveMaximum').value = value;
    },

    setMinimum(value) {
      getProperty(state.props, 'minimum').value = value;
    },

    setExclusiveMinimum(value) {
      getProperty(state.props, 'exclusiveMinimum').value = value;
    },

    setMaxLength(value) {
      getProperty(state.props, 'maxLength').value = value;
    },

    setMinLength(value) {
      getProperty(state.props, 'minLength').value = value;
    },

    setPattern(value) {
      getProperty(state.props, 'pattern').value = value;
    },

    setMaxItems(value) {
      getProperty(state.props, 'maxItems').value = value;
    },

    setMinItems(value) {
      getProperty(state.props, 'minItems').value = value;
    },

    setUniqueItems(value) {
      getProperty(state.props, 'uniqueItems').value = value;
    },

    setEnum(value) {
      getProperty(state.props, 'enum').value = value;
    },

    setMultipleOf(value) {
      getProperty(state.props, 'multipleOf').value = value;
    },

    createItemsProp(newType) {
      const itemsProp = getProperty(state.props, 'items');

      if (!!newType) {
        itemsProp.value = createItems(newType);
      } else {
        itemsProp.value = createItems();
      }
    },
  };

  return Object.assign(
    state,
    toSwagger(state.props),
    createIsValid(state)
  );

  /* ///////////////////////////////////////////////////////
   * Helper Functions /////////////////////////////////////
   ///////////////////////////////////////////////////// */

  /**
   * validItemsProperty - custom validator for Items Object's items property
   *
   * @return {boolean} - returns true if items property is not null and is itself valid
   */
  function validItemsProperty() {
    const itemsProp = getProperty(state.props, 'items');
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
    return getProperty(state.props, 'type').value === 'array';
  }
}
