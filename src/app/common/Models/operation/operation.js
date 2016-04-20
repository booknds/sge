import Property from '../property/property';
import Parameter from '../parameter/parameter';
import Responses from '../responses/responses';
import {
  combineProps,
  getAllProps,
  toSwagger,
  createIsValid,
  getProperty,
  } from '../utils/helpers';

/**
 * Operation - Factory Function to create Operation Objects per the OpenAPI Spec
 *
 * @return {Object}  description
 */
export default function Operation() {
  const parametersValue = [];
  const parametersProperty = Property({
    key: 'responses',
    value: parametersValue,
    required: () => true,
    validIf: () => {
      if (!!parametersValue.length) {
        const everyObjectInParametersIsValid = parametersValue
          .every(parameter => parameter.isValid());

        const atLeastOnlyOneBodyParameterIsFound = parametersValue
          .reduce((bodyParametersFound, parameter) => {
            let sum = bodyParametersFound;

            if (getProperty(parameter.getAllProps(), 'in').value === 'body') {
              sum += 1;
            }

            return sum;
          }, 0);

        if (everyObjectInParametersIsValid && atLeastOnlyOneBodyParameterIsFound < 2) {
          return true;
        }
      }

      return false;
    },
  });

  const props = [
    Property({ key: 'tags', value: [] }),
    Property({ key: 'description' }),
    Property({ key: 'summary' }),
    Property({ key: 'external Docs' }),
    Property({ key: 'operationId' }),
    Property({ key: 'consumes', value: [] }),
    Property({ key: 'produces', value: [] }),
    parametersProperty,
    Property({ key: 'responses', value: Responses() }),
    Property({ key: 'schemes', value: [] }),
    Property({ key: 'depricated' }),
    Property({ key: 'security', value: [] }),
  ];

  const methods = {
    addTagElement(tagValue) {
      const tagProperty = getProperty(props, 'tags');
      if (tagProperty.value.indexOf(tagValue) > 0) {
        tagProperty.value.push(tagValue);
      }
    },
    removeTagElement(tagValue) {
      const tagProperty = getProperty(props, 'tags');
      const tagElementIndex = tagProperty.value.indexOf(tagValue);
      if (tagElementIndex > -1) {
        tagProperty.value.splice(tagElementIndex, 1);
      }
    },
    addConsumesElement(consumeValue) {
      const consumeProperty = getProperty(props, 'consumes');
      if (consumeProperty.value.indexOf(consumeValue) > 0) {
        consumeProperty.value.push(consumeValue);
      }
    },
    removeConsumesElement(consumeValue) {
      const consumesProperty = getProperty(props, 'consumes');
      const consumesElementIndex = consumesProperty.value.indexOf(consumeValue);
      if (consumesElementIndex > -1) {
        consumesProperty.value.splice(consumesElementIndex, 1);
      }
    },
    addProducesElement(producesValue) {
      const producesProperty = getProperty(props, 'produces');
      if (producesProperty.value.indexOf(producesValue) > 0) {
        producesProperty.value.push(producesValue);
      }
    },
    removeProducesElement(producesValue) {
      const producesProperty = getProperty(props, 'produces');
      const produceElementIndex = producesProperty.value.indexOf(producesValue);
      if (produceElementIndex > -1) {
        producesProperty.value.splice(produceElementIndex, 1);
      }
    },
    addSchemesElement(schemesValue) {
      const schemesProperty = getProperty(props, 'schemes');
      if (schemesProperty.value.indexOf(schemesValue) > 0) {
        schemesProperty.value.push(schemesValue);
      }
    },
    removeSchemesElement(schemesValue) {
      const schemesProperty = getProperty(props, 'schemes');
      const schemesElementIndex = schemesProperty.value.indexOf(schemesValue);
      if (schemesElementIndex > -1) {
        schemesProperty.value.splice(schemesElementIndex, 1);
      }
    },
    addParametersElement() {
      return true;
    },
    removeParameterElement() {
      return false;
    },
  };

  const completeState = Object.assign(
    {},
    combineProps(props),
    getAllProps(props),
    toSwagger(props),
    createIsValid(props),
    methods
  );

  return Object.freeze(completeState);
}
