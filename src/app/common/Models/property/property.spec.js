import test from 'ava';
import createProperty from './property';

let property;

test.beforeEach(() => {
  property = createProperty('name');
});

test('Property with only a key ', t => {
  t.ok(property.key, 'should have a property key when specified and');
  t.notOk(property.value, 'should not have a value if not specified');
  t.notOk(property.required, 'should not be required by default and ');
  t.false(property.isValid, 'should not be valid when there is no value');
});

test('Property with a key and value', t => {
  property.value = 'MIT';

  t.ok(property.value, 'should have a value');
  t.true(property.isValid, 'should be valid when there is a value');
});

test('Property with a key, value and is required', t => {
  property.value = 'MIT';
  t.true(property.isValid, 'should be valid when the value is not null or falsy');

  property.value = null;
  t.false(property.isValid, 'should be invalid when property is required and  its missing a value');
});
