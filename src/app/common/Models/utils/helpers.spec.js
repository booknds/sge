import test from 'ava';
import { validate, getProp } from './helpers';

/**
 *  Test validate()
 */
test('validate() should reject a null value', t => {
  t.false(validate(null));
});

test('validate() should reject an object that is not valid itself', t => {
  t.false(validate({ isValid: () => false }));
  t.true(validate({ isValid: () => true }));
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
  t.true(getName({ name: 'title' }));
});

test.todo('toSwagger()');
// , t => {
//   const props = [];
//   const swaggerify = toSwagger();
// });


