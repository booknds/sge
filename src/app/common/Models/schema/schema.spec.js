import test from 'ava';
import Schema from './schema';
import { getProperty } from '../utils/helpers';

// ----------------------------------------------
// Set up Tests
// ----------------------------------------------
let schema;
const propsThatShouldBeOnSchemaObject =
  [
    'type', 'items', '$ref', 'title', 'allOf',
    'properties', 'additionalProperties', 'discriminator',
    'readOnly', 'xml', 'externalDocs', 'example',
    'format', 'collectionFormat', 'default',
    'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum',
    'maxLength', 'minLength', 'pattern', 'maxItems', 'minItems',
    'uniqueItems', 'enum', 'multipleOf',
  ];

test.beforeEach(() => {
  schema = Schema();
});

// ----------------------------------------------
// Tests
// ----------------------------------------------
test('schema object should get properties inherited from schema base objects', t => {
  const schemaProps = schema.getAllProps();

  t.true(schemaProps.every(prop => (
    propsThatShouldBeOnSchemaObject.indexOf(prop.getKey()) > -1
  )));
});

test.todo('Schema object should set properties on inherited from schemaBase');

test('items property should be required conditionally', t => {
  const itemsProp = getProperty(schema.getAllProps(), 'items');
  t.false(itemsProp.isRequired());
  schema.setType('array');
  t.true(itemsProp.isRequired());
});

test('Schema Object should not be modifiable', t => {
  t.throws(() => (schema.newProp = 'a')());

  t.throws(() => (schema.getAllProps = () => true)());
});

test('Schema Object should validate', t => {
  t.false(schema.isValid());
  schema.setType('array');
  t.false(schema.isValid());

  schema.createItemsProp();
  t.false(schema.isValid());

  const itemsProp = getProperty(schema.getAllProps(), 'items').value;
  itemsProp.setType('awesome');
  t.true(schema.isValid());
});

test('Scema Object transform data to a swagger object', t => {
  schema.setType('string');
  t.deepEqual(schema.swaggerify(), { type: 'string' });
});
