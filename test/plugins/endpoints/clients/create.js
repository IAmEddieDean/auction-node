/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');
var Sinon = require('sinon');
var Client = require('../../../../lib/models/client');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;
var before = lab.before;
var after = lab.after;
var CP = require('child_process');
var Path = require('path');
var beforeEach = lab.beforeEach;

var server;

describe('POST /clients', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });

  beforeEach(function(done){
    var db = server.app.environment.MONGO_URL.split('/')[3];
    CP.execFile(Path.join(__dirname, '../../../../scripts/clean-db.sh'), [db], {cwd: Path.join(__dirname, '../../../../scripts')}, function(){
      done();
    });
  });

  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });

  it('should create a new client', function(done){
    server.inject({method: 'POST', url: '/clients', credentials: {userId: 'b00000000000000000000003'}, payload: {email: 'lksd@lksd.com', displayName: 'sdijio', phone: 5555555555, firstName: 'sdjf', lastName: 'ksdjf', company: 'lkjsdf', address: {street: '123 main', city: 'la', state: 'mo', zip: 57575}}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result._id.toString()).to.have.length(24);
      done();
    });
  });
  it('should err for unauthorized access', function(done){
    server.inject({method: 'POST', url: '/clients', credentials: {userId: 'b00000000000033000000003'}, payload: {email: 'lksd@lksd.com', displayName: 'sdijio', phone: 5555555555, firstName: 'sdjf', lastName: 'ksdjf', company: 'lkjsdf', address: {street: '123 main', city: 'la', state: 'mo', zip: 57575}}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result._id.toString()).to.have.length(24);
      done();
    });
  });
  it('should throw db err', function(done){
    var stub = Sinon.stub(Client, 'find').yields(new Error());
    server.inject({method: 'POST', url: '/clients', credentials: {userId: 'b00000000000000000000003'}, payload: {email: 'lksd@lksd.com', displayName: 'sdijio', phone: 5555555555, firstName: 'sdjf', lastName: 'ksdjf', company: 'lkjsdf', address: {street: '123 main', city: 'la', state: 'mo', zip: 57575}}}, function(response){
      expect(response.statusCode).to.equal(400);
      stub.restore();
      done();
    });
  });
});
