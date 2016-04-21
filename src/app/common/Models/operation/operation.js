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

function parameterDoesNotExist(array, { name, in: inProp }) {
  return (
    array.filter(element => element[0] === 'parameter')
      .map(element => element[1])
      .every(parameter => getProperty(parameter.getAllProps(), 'name').value !== name &&
        getProperty(parameter.getAllProps(), 'in').value !== inProp)
  );
}

/**
 * Operation - Factory Function to create Operation Objects per the OpenAPI Spec
 *
 * @return {Object}  description
 */
export default function Operation() {
  const parametersProperty = Property({
    key: 'parameters',
    value: [],
    validIf: (value) => {
      if (value.length > 0) {
        const everyObjectInParametersIsValid = value
          .every(parameter => parameter.isValid());

        const atLeastOnlyOneBodyParameterIsFound = value
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

  const responsesProperty = Property({
    key: 'responses',
    value: Responses(),
    required: () => true,
    validIf() {
      const responsesIsNotEmtpy = responsesProperty.value.getAllProps().length > 0;
      const responseObjectIsValid = responsesProperty.value.isValid();

      return (responsesIsNotEmtpy && responseObjectIsValid);
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
    responsesProperty,
    Property({ key: 'schemes', value: [] }),
    Property({ key: 'depricated' }),
    Property({ key: 'security', value: [] }),
  ];

  const methods = {
    addTagElement(tagValue) {
      const tagProperty = getProperty(props, 'tags');
      if (tagProperty.value.indexOf(tagValue) < 0) {
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
      if (consumeProperty.value.indexOf(consumeValue) < 0) {
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
      if (producesProperty.value.indexOf(producesValue) < 0) {
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
      if (schemesProperty.value.indexOf(schemesValue) < 0) {
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
    addParametersElement({ type, objectData }) {
      const { name, in: inProp } = objectData;

      switch (type) {
        case 'parameter':
          if (parameterDoesNotExist(parametersProperty.value, objectData)) {
            const newParam = Parameter();
            newParam.setName(name);
            newParam.setIn(inProp);
            parametersProperty.value.push(newParam);
          }
          break;
        case '$ref':
          parametersProperty.value.push({ $ref: objectData.$ref });
          break;
        default:
          return null;
      }
    },
    removeParameterElement() {
      return false;
    },
    /*
    isValid() {
      const basicPropertiesAreValid = createIsValid(props).isValid();
      let parametersAreValid = true;
      if (parametersProperty.isValid)
    },*/
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
