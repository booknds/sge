import test from 'ava';
import { validate, getProperty } from './helpers';
import Property from '../property/property';

// ----------------------------------------------
// Tests
// ----------------------------------------------
test('validate() should reject a undefined value', t => {
  t.false(validate(undefined));
});

test('validate() should reject an object that is not valid itself', t => {
  t.false(validate({ isValid() { return false; } }));
  t.true(validate({ isValid() { return true; } }));
});

test('validate() should reject an empty array', t => {
  t.false(validate([]));
  t.true(validate([{}]));
});

test('validate should reject a falsy value', t => {
  t.false(validate(undefined));
  t.false(validate(''));
  t.false(validate(0));
  t.false(validate(false));

  t.true(validate('Hello!'));
  t.true(validate(1));
  t.true(validate(true));
});

test.todo('toSwagger()');
// , t => {
//   const props = [];
//   const swaggerify = toSwagger();
// });

test('getProperty', t => {
  const state = [
    Property('title', 'Spidey'),
    Property('name', 'Petey'),
  ];

  t.true(getProperty(state, 'title') === state[0]);
  t.true(getProperty(state, 'name') === state[1]);
});
