import test from 'ava';
import Schema from './schema';

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

test('schema object should get properties inherited from schema base objects', t => {
  const schemaProps = schema.getAllProps();

  t.true(schemaProps.every(prop => (
    propsThatShouldBeOnSchemaObject.indexOf(prop.getKey()) > -1
  )));
});

test.todo('Schema object should set properties on inherited from baseObject');
test.todo('items property should be required conditionally');
test.todo('Schema Object should not be modifiable');
test.todo('Schema Object should validate');
test.todo('Scema Object transform data to a swagger object');
