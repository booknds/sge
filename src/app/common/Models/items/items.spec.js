import test from 'ava';
import createItems from './items';
import { getProperty } from '../utils/helpers';

let items;

test.beforeEach(() => {
  items = createItems();
});

test('type property is required for an Items Object', t => {
  items.setType('string');
  const typeProp = getProperty(items.getAllProps(), 'type');
  t.true(typeProp.value === 'string');
});

test('items property is required if the type is set to "array"', t => {
  items.setType('array');
  const itemsProp = getProperty(items.getAllProps(), 'items');
  t.true(itemsProp.required);
});

test('Items object can validate', t => {
  t.false(items.isValid());
  items.setType('array');
  t.false(items.isValid());

  items.createItemsProp();
  t.false(items.isValid());

  const itemsProp = getProperty(items.getAllProps(), 'items').value;
  itemsProp.setType('awesome');
  t.true(items.isValid());
});
