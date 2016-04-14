import test from 'ava';
import createInfo from './info';
import { getProperty } from '../utils/helpers';

let info;

test.beforeEach(() => {
  info = createInfo();
});

test('info should only be able to set a title', t => {
  info.setProperty('title', 'Captain Planet');
  const titleProp = getProperty(info.getAllProps(), 'title');

  t.true(titleProp.value === 'Captain Planet');
  t.throws(info.title);
});

test('info should only be able to set the version, not get', t => {
  info.setProperty('version', 'Hulk Buster');
  const versionProp = getProperty(info.getAllProps(), 'version');

  t.true(versionProp.value === 'Hulk Buster');
  t.throws(info.version);
});

test('info should only be able to set the description, not get', t => {
  info.setProperty('description', 'Hulk Smash');
  const descriptionProp = getProperty(info.getAllProps(), 'description');

  t.true(descriptionProp.value === 'Hulk Smash');
  t.throws(info.description);
});

test('info should only be able to set the termsOfService, not get', t => {
  info.setProperty('termsOfService', 'All propfit goes to Mr.Stark');
  const tosProp = getProperty(info.getAllProps(), 'termsOfService');

  t.true(tosProp.value === 'All propfit goes to Mr.Stark');
  t.throws(info.termsOfService);
});

test('can create a license object', t => {
  info.addObjectProp('license');
  const licenseProp = getProperty(info.getAllProps(), 'license');

  t.true(getProperty(licenseProp.value.getAllProps(), 'name').value === '');
});

test('can create a contact object', t => {
  info.addObjectProp('contact');
  const contactProp = getProperty(info.getAllProps(), 'contact');

  t.true(getProperty(contactProp.value.getAllProps(), 'name').value === undefined);
});

test('can remove licnese or contact objects', t => {
  info.addObjectProp('license');
  info.removeObjectProp('license');
  t.ok(getProperty(info.getAllProps(), 'license'));

  info.addObjectProp('contact');
  info.removeObjectProp('contact');
  t.ok(getProperty(info.getAllProps(), 'contact'));
});

test('info should validate', t => {
  info.setProperty('title', 'X-Men');
  t.true(info.isValid());

  info.setProperty('version', 'first class');
  t.true(info.isValid());

  info.setProperty('title', '');
  t.false(info.isValid());

  info.setProperty('title', 'Avengers');
  info.setProperty('version', '');

  t.false(info.isValid());
});
