const mongoose = require('mongoose');
const config = require('../config');
const TEST_DATABASE = config.database + '_test';

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect(TEST_DATABASE, { useNewUrlParser: true });
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  clearDB(done);
});

after((done) => {
  clearDB(done);
});

const clearDB = (done) => {
  const { champions, regions, weapons } = mongoose.connection.collections;
  // clear all collections
  champions.drop(() => {
    regions.drop(() => {
      weapons.drop(() => {
        done();
      });
    });
  });
}