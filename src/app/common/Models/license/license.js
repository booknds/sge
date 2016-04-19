import Property from '../property/property.js';
import { getAllProps, toSwagger, createIsValid, makeSetProperty } from '../utils/helpers';

export default function License({ name = '' } = {}) {
  const props =
    [
      Property({ key: 'name', value: name, required: () => true }),
      Property({ key: 'url' }),
    ];

  // const state = {
  //   setName(value) {
  //     state.props.find(getProp('name')).value = value;
  //   },

  //   setUrl(value) {
  //     state.props.find(getProp('url')).value = value;
  //   },

  //   isValid() {
  //     const requiredPropsAreValid =
  //       state.props
  //         .filter(prop => prop.isRequired())
  //         .every(prop => prop.isValid());

  //     if (!requiredPropsAreValid) {
  //       return requiredPropsAreValid;
  //     }

  //     const remainingPropsAreValid =
  //       state.props
  //         .filter(props => !props.isRequired() && !!props.value)
  //         .every(prop => prop.isValid());

  //     return remainingPropsAreValid;
  //   },
  // };

  const completeState = Object.assign(
    toSwagger(props),
    createIsValid(props),
    getAllProps(props),
    makeSetProperty(props));

  return Object.freeze(completeState);
}

/**
 * OLOO Pattern
 *
const License = {
  init(name = '') {
    this.props = [
      property('name', name, true),
      property('url', null),
    ];
  },
  set name(value) {
    this.props.find(prop => prop.name === "name" ).value = value;
  },
  set url(value) {
    this.props.find(getProp('url')).value = value;
  },
  get isValid() {
    const requiredPropsAreValid =
      this.props
        .filter(prop => prop.isRequired())
        .every(prop => prop.isValid());

    if (!requiredPropsAreValid) {
      return requiredPropsAreValid;
    }

    const remainingPropsAreValid =
      this.props
        .filter(props => !props.isRequired() && !!props.value)
        .every(prop => prop.isValid());

    return remainingPropsAreValid;
  },
};

const createLicense = (name) => {
  let tmp = Object.create(License);
  tmp.init(name);
  return tmp;
}

export default createLicense;
*/
