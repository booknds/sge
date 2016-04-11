import test from 'ava';
import { validate, getProp, getProperty } from './helpers';

/**
 *  Test validate()
 */
test('validate() should reject a null value', t => {
  t.false(validate(null));
});

test('validate() should reject an object that is not valid itself', t => {
  t.false(validate({ get isValid() { return false; } }));
  t.true(validate({ get isValid() { return true; } }));
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

/**
 * Test getProp()
 */
test('getProp should return a helper function to be passed to an arrays filter function', t => {
  const getName = getProp('title');
  t.true(getName({ key: 'title' }));
});

test.todo('toSwagger()');
// , t => {
//   const props = [];
//   const swaggerify = toSwagger();
// });

test('getProperty', t => {
  const state = [
    {
      key: 'title',
      value: 'Spidey',
      get required() { return true; },
    },
    {
      key: 'name',
      value: 'Pete',
      get required() { return false;},
    },
  ];

  t.true(getProperty(state, 'title') === state[0]);
  t.true(getProperty(state, 'name') === state[1]);
});
