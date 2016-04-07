import test from 'ava';
import createInfo from './info';

let info;

test.beforeEach(() => {
  info = createInfo();
});

test('info should only be able to set a title', t => {
  info.title = 'Captain Planet';
  const titleProp = info.props.find(prop => prop.key === 'title');

  t.true(titleProp.value === 'Captain Planet');
  t.throws(info.title);
});

test('info should only be able to set the version, not get', t => {
  info.version = 'Hulk Buster';
  const versionProp = info.props.find(prop => prop.key === 'version');

  t.true(versionProp.value === 'Hulk Buster');
  t.throws(info.version);
});

test('info should only be able to set the description, not get', t => {
  info.description = 'Hulk Smash';
  const descriptionProp = info.props.find(prop => prop.key === 'description');

  t.true(descriptionProp.value === 'Hulk Smash');
  t.throws(info.description);
});

test('info should only be able to set the termsOfService, not get', t => {
  info.termsOfService = 'All propfit goes to Mr.Stark';
  const tosProp = info.props.find(prop => prop.key === 'termsOfService');

  t.true(tosProp.value === 'All propfit goes to Mr.Stark');
  t.throws(info.termsOfService);
});

test('can create a license object', t => {
  info.addObjectProp('license');
  const licenseProp = info.props.find(prop => prop.key === 'license');

  t.true(licenseProp.value.props.find(prop => prop.key === 'name').value === '');
});

test('can create a contact object', t => {
  info.addObjectProp('contact');
  const contactProp = info.props.find(prop => prop.key === 'contact');

  t.true(contactProp.value.props.find(prop => prop.key === 'name').value === null);
});

test('can remove licnese or contact objects', t => {
  info.addObjectProp('license');
  info.removeObjectProp('license');
  t.ok(info.props.find(prop => prop.key === 'license'));

  info.addObjectProp('contact');
  info.removeObjectProp('contact');
  t.ok(info.props.find(prop => prop.key === 'contact'));
});

test('info should validate', t => {
  console.warn('validate test');

  info.title = 'X-Men';
  t.true(info.isValid);

  info.version = 'first class';
  t.true(info.isValid);

  info.title = '';
  t.false(info.isValid);

  info.title = 'Avengers';
  info.version = '';

  t.false(info.isValid);
});

// import Info from './info';
// import {expect} from 'chai';
// import sinon from 'sinon';


// describe('Info object', function() {

//   var info;

//   before(function() {
//     info = new Info();
//   });

//   describe('addLicense', function() {

//     it('should add a license when there isnt one', function() {
//       expect(info.license).to.be.null;
//       info.addLicense();
//       expect(info.license).to.not.be.null;
//       expect(info.license).to.contain.keys(['name', 'url']);
//     });

//   });

//   describe('RemoveLicense', function() {

//     before(function() {
//       info.addLicense();
//     });

//     it('should remove a license', function() {
//       expect(info.license).to.not.be.null;
//       info.removeLicense();
//       expect(info.license).to.be.null;
//     });

//   });
// });
