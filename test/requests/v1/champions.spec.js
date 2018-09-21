let mongoose = require("mongoose");
let Champion = require('../../../app/models/champion');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Champion Endpoints', () => {
  let champ;

  beforeEach((done) => {
    champ = new Champion({ name: 'Adam' });
    champ.save()
      .then(() => done());
  });

  /*
  * Test the /GET route
  */
  describe('/GET champions', () => {
    it('should GET all the champions', (done) => {
      chai.request(server)
        .get('/api/champions')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST champions', () => {
    it('should save a valid champion', (done) => {
      let champ = {
        name: "Test Champ"
      };
      chai.request(server)
        .post('/api/champions')
        .send(champ)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.eq('Champion successfully added!');
          done();
        });
    });
    it('should not POST a champion without a name', (done) => {
      let champ = {
        aliases: ["Champ Champ", "The Peoples Champ"]
      };
      chai.request(server)
        .post('/api/champions')
        .send(champ)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('name');
          res.body.errors.name.should.have.property('kind').eql('required');
          done();
        });
    });
  });

  describe('/GET champions/:id', () => {
    it('should GET a single champion', (done) => {
      chai.request(server)
        .get(`/api/champions/${champ._id}`)
        .end((err, res) => {
          //console.log('ERROR OBJECT:', res);
          res.should.have.status(200);
          // res.body.should.be.a('array');
          // res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
   * Test suite for /PATCH route
   */
  describe('/PATCH champions/:id', () => {
    it('should PATCH a champion', (done) => {
      const update = {
        aliases: ["Champs Champ", "The people's champ"]
      };
      chai.request(server)
        .put(`/api/champions/${champ._id}`)
        .send(update)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('champ');
          res.body.champ.should.have.property('aliases');
          res.body.champ.aliases[0].should.eql('Champs Champ');
          done();
        });
    });
  });

  /*
   * Test suite for /DELETE route
   */
  describe('/DELETE champions/:id', () => {
    it('should DELETE a champion', (done) => {
      chai.request(server)
        .delete(`/api/champions/${champ._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.eq('Champion successfully deleted!');
          done();
        });
    });
  });
});