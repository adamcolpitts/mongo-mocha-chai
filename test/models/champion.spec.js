require('../test_helper');

const expect = require('chai').expect;
const Champion = require('../../app/models/champion');

describe('Champion', () => {
  let champ;

  beforeEach((done) => {
    champ = new Champion({ name: 'Adam', pronunciation: "/ˈæ.dəm/", aliases: ['SKiP', 'S|<arecröw'] });
    champ.save()
      .then(() => done());
  });

  it('should have the correct sub-category type', () => {
    expect(champ.sub_category).to.equal('CHAMPION');
  });

  it('should require a name', () => {
    const invalid = new Champion({ name: undefined });
    const validationResult = invalid.validateSync();
    const { message } = validationResult.errors.name;

    expect(message).to.equal('Name is required.');
  });

  it('should require `name` to be at least 2 characters', () => {
    const invalid  = new Champion({ name: ' a  '});
    const validationResult = invalid.validateSync();
    const { message } = validationResult.errors.name;

    expect(message).to.equal('Name must be at least 2 characters.')
  });

  it('should save a valid model', () => {
    expect(champ.isNew).to.equal(false);
  });

  it('should set `created_at` before first save', (done) => {
    const testChamp = new Champion({ name: 'Test Champ' });
    testChamp.save()
      .then((doc) => {
        expect(doc.created_at).not.to.equal(undefined);
        done();
      })
  });
});