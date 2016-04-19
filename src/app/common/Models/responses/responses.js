import Property from '../property/property';
import Response from '../response/response';
import { getAllProps, toSwagger, createIsValid, getProperty } from '../utils/helpers';

/**
 * Responses - factory function for creating Respones objects
 *
 * @return {type}  Responses Object
 */
export default function Responses() {
  const props = [];

  const doesPropsHaveExistingHttpCode = httpCode => (
    props.filter(
      prop => prop.getKey() === httpCode).length === 1);

  const methods = {
    addResponse(httpCode) {
      if (!doesPropsHaveExistingHttpCode(httpCode)) {
        props.push(Property({ key: httpCode, value: Response() }));
      } else {
        throw new Error(`HttpCode ${httpCode} already Exists`);
      }
    },

    removeResponse(httpCode) {
      if (doesPropsHaveExistingHttpCode(httpCode)) {
        const propertyToRemove = getProperty(props, httpCode);
        const indexOfPropertyToRemove = props.indexOf(propertyToRemove);

        props.splice(indexOfPropertyToRemove, 1);
      }
    },
  };

  const completeState = Object.assign(
    {},
    toSwagger(props),
    createIsValid(props),
    getAllProps(props),
    methods
  );

  return Object.freeze(completeState);
}
