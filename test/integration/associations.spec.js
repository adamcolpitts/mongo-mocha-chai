require('../test_helper');

const expect = require('chai').expect;
const Champion = require('../../app/models/champion');
const Region = require('../../app/models/region');
const Weapon = require('../../app/models/weapon');

describe('Champion Associations', () => {
  let champ, region, weapon;

  beforeEach((done) => {
    champ = new Champion({ name: 'Adam' });
    region = new Region({ name: 'Coast Mountains' });
    weapon = new Weapon({ name: 'Morning star' });

    champ.region_born = region;
    weapon.owners.push(champ);

    Promise.all([champ.save(), region.save(), weapon.save()])
      .then(() => done());
  });

  it('should belong to a region', (done) => {
    Champion.findOne({ name: 'Adam' })
      .populate('region_born')
      .then((champion) => {
        expect(champion.region_born.name).to.equal('Coast Mountains');
        done();
      })
  });

  it('should own a weapon', (done) => {
    Weapon.findOne({ name: 'Morning star' })
      .then((weapon) => {
        expect(weapon.owners[0].name).to.equal('Adam');
        done();
      });
  });
});