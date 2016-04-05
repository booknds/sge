export const validate = value => {
  if (value === null) {
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

export const getProp =
  name =>
    prop => prop.name === name;

export const toSwagger = props => (
  {
    swaggerify: () => (
      props.filter(prop => prop.isValid)
        .reduce((minimalInfo, prop) => {
          const minimal = minimalInfo;
          minimal[prop.name] = prop.value;
          return minimal;
        }, {})
    ),
  }
);

