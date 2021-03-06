'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('GET - images ', () => {
  it('should exist', (done) => {
    request(app)
      .get('/images')
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal({
            'body': 'To be defined'
          });
          done();
      });
  });
});