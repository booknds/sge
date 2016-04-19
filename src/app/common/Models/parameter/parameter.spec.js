import test from 'ava';
import Parameter from './parameter';
import { getProperty } from '../utils/helpers';

// ----------------------------------------------
// Set up Tests
// ----------------------------------------------
let parameter;

test.beforeEach(() => {
  parameter = Parameter();
});

// ----------------------------------------------
// Tests
// ----------------------------------------------
test('schema should be a required property if "in" === "body"', t => {
  const schemaProp = getProperty(parameter.getAllProps(), 'schema');
  t.false(schemaProp.isRequired());

  parameter.setIn('body');
  t.true(schemaProp.isRequired());
});
test('"name" and "in" properties are required', t => {
  const nameProp = getProperty(parameter.getAllProps(), 'name');
  const inProp = getProperty(parameter.getAllProps(), 'in');

  t.true(nameProp.isRequired());
  t.true(inProp.isRequired());
});

test('type property is required if "in" !== "body"', t => {
  const typeProp = getProperty(parameter.getAllProps(), 'type');
  parameter.setIn('body');
  t.false(typeProp.isRequired());

  parameter.setIn('query');
  t.true(typeProp.isRequired());
});

const p2 = Parameter();
p2.setName('id');
p2.setIn('query');
p2.setType('array');
p2.createItemsProp('string');
// console.log(p2.swaggerify());

test.skip('paramter objects correctly map to swagger objects', t => {
  parameter.setName('pet');
  parameter.setIn('query');
  parameter.setType('array');
  parameter.createItemsProp('string');

  t.is(parameter.swaggerify(),
    {
      name: 'id',
      in: 'query',
      type: 'array',
      items: {
        type: 'string',
      },
    }
  );
});
