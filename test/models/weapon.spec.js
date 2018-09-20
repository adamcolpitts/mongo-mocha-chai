require('../test_helper');

const expect = require('chai').expect;
const Weapon = require('../../src/models/weapon');

describe('Weapon', () => {
  let weapon;

  beforeEach((done) => {
    weapon = new Weapon({ name: 'Morning star' });
    weapon.save()
      .then(() => {
        done();
      });
  });

  it('should have the correct sub-category type', () => {
    expect(weapon.category).to.equal('WEAPON');
  });

  it('should require a name', () => {
    const invalid = new Weapon({ name: undefined });
    const validationResult = invalid.validateSync();
    const { message } = validationResult.errors.name;

    expect(message).to.equal('Name is required.');
  });
});