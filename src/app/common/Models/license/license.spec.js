import test from 'ava';
import licenseCreator from './license';

let license;

test.beforeEach(() => {
  license = licenseCreator();
});

test('license is valid if it has a name', t => {
  t.false(license.isValid);

  license.name = 'MIT';

  t.true(license.isValid);
});

test('license should convert to JSON representation of a swagger object', t => {
  t.same(license.swaggerify(), {});

  license.name = 'MIT';

  t.same(license.swaggerify(), { name: 'MIT' });

  license.url = 'http://www.google.com/';

  t.same(license.swaggerify(), { name: 'MIT', url: 'http://www.google.com/' });
});
