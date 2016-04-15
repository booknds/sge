import test from 'ava';
import Parameter from './parameter';
import { getProperty } from '../utils/helpers';

let parameter;

test.skip.beforeEach(() => {
  parameter = Parameter();
});

test.skip('schema should be a required property if "in" === "body"', t => {
  const schemaProp = getProperty(parameter.getAllProps, 'schema');
  t.false(schemaProp.isRequired());

  parameter.setIn('body');
  t.true(schemaProp.isRequired());
});
test.skip('"name" and "in" properties are required', t => {
  const nameProp = getProperty(parameter.getAllProps(), 'name');
  const inProp = getProperty(parameter.getAllProps(), 'info');

  t.true(nameProp.isRequired());
  t.true(inProp.isRequired());
});

test.skip('type property is required if "in" === "body"', t => {
  const typeProp = getProperty(parameter.getAllProps(), 'type');
  t.false(typeProp.isRequired());

  parameter.setIn('query');
  t.true(typeProp.isRequired());
});
