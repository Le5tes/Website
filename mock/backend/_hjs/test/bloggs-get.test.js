'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('GET - bloggs ', () => {
  it('should exist', (done) => {
    request(app)
      .get('/bloggs')
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          done();
      });
  });
});