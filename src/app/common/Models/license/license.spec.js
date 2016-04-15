import test from 'ava';
import License from './license';

// ----------------------------------------------
// Set up Tests
// ----------------------------------------------
let license;

test.beforeEach(() => {
  license = License();
});

// ----------------------------------------------
// Tests
// ----------------------------------------------
test('license is valid if it has a name', t => {
  t.false(license.isValid());

  license.setProperty('name', 'MIT');

  t.true(license.isValid());
});

test('license should convert to JSON representation of a swagger object', t => {
  t.deepEqual(license.swaggerify(), {});

  license.setProperty('name', 'MIT');

  t.deepEqual(license.swaggerify(), { name: 'MIT' });

  license.setProperty('url', 'http://www.google.com/');

  t.deepEqual(license.swaggerify(), { name: 'MIT', url: 'http://www.google.com/' });
});
