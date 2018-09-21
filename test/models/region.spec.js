require('../test_helper');

const expect = require('chai').expect;
const Region = require('../../app/models/region');

describe('Region', () => {
  let region;

  beforeEach((done) => {
    region = new Region({ name: 'Coast Mountains' });
    region.save()
      .then((doc) => {
        done();
      });
  })

  it('should require a name', () => {
    const invalid = new Region({ name: undefined });
    const validationResult = invalid.validateSync();
    const { message } = validationResult.errors.name;

    expect(message).to.equal('Name is required.');
  });
});