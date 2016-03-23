'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
require(__dirname + '/../server.js');

chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

describe('testing functionality of the server', function() {

  it('should GET', (done) => {
    request('localhost:3000')
      .get('/users')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('should POST', (done) => {
    request('localhost:3000')
      .post('/user')
      .send({username: 'testuser', files: []})
      .end((err, res) => {
        // expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // it('should POST', (done) => {
  //   request('localhost:3000')
  //     .post('/public/login')
  //     .send({name: 'user1', password: '123'})
  //     .end((err, res) => {
  //       expect(err).to.eql(null);
  //       expect(res.body).to.be.an('object');//check for id
  //       done();
  //     });
  // });


});
