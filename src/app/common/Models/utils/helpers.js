import { flatten } from 'lodash';

export const validate = value => {
  if (typeof value === 'undefined') {
    return false;
  }

  if (Array.isArray(value)) {
    return !!value.length;
  }

  switch (typeof value) {
    case 'object':
      return value.isValid();
    default:
      return !!value;
  }
};

export const getProperty = (props, propName) =>
  props.find(prop => prop.getKey() === propName);

export const toSwagger = props => (
  {
    swaggerify: () => (
      props
        .filter(prop => prop.isValid())
        .reduce((minimalInfo, prop) => {
          const minimal = minimalInfo;
          if (typeof prop.value === 'object') {
            minimal[prop.getKey()] = prop.value.swaggerify();
          } else {
            minimal[prop.getKey()] = prop.value;
          }

          return minimal;
        }, {})
    ),
  }
);

export const createIsValid = props => (
  {
    isValid() {
      const requiredPropsAreValid = props
        .filter(prop => prop.isRequired())
        .every(prop => prop.isValid());

      const restAreValid = props
        .filter(prop => !prop.isRequired() && typeof prop.value !== 'undefined')
        .filter(prop => Array.isArray(prop.value) && !!prop.value.length)
        .every(prop => prop.isValid());

      return (requiredPropsAreValid && restAreValid);
    },
  }
);

export const makeSetProperty = props => (
  {
    setProperty(key, value = undefined) {
      getProperty(props, key).value = value || undefined;
    },
  }
);

export const getAllProps = (...props) => (
  {
    getAllProps() {
      return flatten(props);
    },
  }
);

/**
 * @param  {any} props
 * @param  {any} factories
 */
export const makeAddObjectProp = (props, factories) => (
  {
    addObjectProp(propName) {
      const objectProp = getProperty(props, propName);
      objectProp.value = objectProp.value || factories[propName]();
    },
  });

/**
 * @param  {any} props
 */
export const makeRemoveObjectProp = (props) => (
  {
    removeObjectProp(propName) {
      const objectProp = getProperty(props, propName);
      objectProp.value = undefined;
    },
  });

export const combineProps = (...props) => flatten(props);
