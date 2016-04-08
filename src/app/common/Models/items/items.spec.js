import test from 'ava';
import createItems from './items';
import { getProperty } from '../utils/helpers';

let items;

test.beforeEach(() => {
  items = createItems();
});

test('type property is required for an Items Object', t => {
  items.type = 'string';
  const typeProp = getProperty(items.props, 'type');
  t.true(typeProp.value === 'string');
});

test('items property is required if the type is set to "array"', t => {
  items.type = 'array';
  const itemsProp = getProperty(items.props, 'items');
  t.true(itemsProp.required);
});

test.todo('Items object can validate');
