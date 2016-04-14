import test from 'ava';
import SchemaBase from './schemaBase';
import Property from '../property/property';

// ----------------------------------------------
// Set up Tests
// ----------------------------------------------
let schemaBase;
const propsThatShouldBeOnSchemaBaseObject =
  [
    'format', 'collectionFormat', 'default',
    'maximum', 'exclusiveMaximum', 'minimum', 'exclusiveMinimum',
    'maxLength', 'minLength', 'pattern', 'maxItems', 'minItems',
    'uniqueItems', 'enum', 'multipleOf',
  ];

test.beforeEach(() => {
  schemaBase = SchemaBase();
});


// ----------------------------------------------
// Tests
// ----------------------------------------------

test('grab all the properties of the schemaBase', t => {
  const schemaBaseProps = schemaBase.getAllProps();

  t.true(schemaBaseProps.every(prop => (
    propsThatShouldBeOnSchemaBaseObject.indexOf(prop.getKey()) > -1
  )));
});

test('set any value of the schemaBase properties', t => {
  t.true(
    schemaBase
      .getAllProps()
      .map(prop => (Property(prop.getKey(), 'Keep your head up')))
      .every(prop => (prop.value === 'Keep your head up')));

  t.true(schemaBase
    .getAllProps()
    .map(prop => (Property(prop.getKey(), 'Keep your head up'))).length === 15);
});

test('should not be able to modify any properties on the schemaBase object', t => {
  t.throws(
    () => (schemaBase.newProperty = 'adding a new Property to the schemaBase Object')()
  );

  t.throws(
    () => (schemaBase.getAllProps = () => ('I should not be able to modify this method'))()
  );
});
