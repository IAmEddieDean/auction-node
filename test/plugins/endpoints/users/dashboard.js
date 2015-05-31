/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');
var Item = require('../../../../lib/models/item');
var Sinon = require('sinon');

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

describe('GET /users', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });

  beforeEach(function(done){
    var db = server.app.environment.MONGO_URL.split('/')[3];
    CP.execFile(Path.join(__dirname, '../../../../../scripts/clean-db.sh'), [db], {cwd: Path.join(__dirname, '../../../../../scripts')}, function(){
      done();
    });
  });

  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });

  it('should return an existing user', function(done){
    server.inject({method: 'GET', url: '/users/bobson', credentials: {_id: 'b00000000000000000000002'}}, function(response){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should return a users bids', function(done){
    server.inject({method: 'GET', url: '/users/bobson', credentials: {_id: 'b00000000000000000000002'}}, function(response){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should err for no user', function(done){
    server.inject({method: 'GET', url: '/users/bobson', credentials: {_id: 'b00000000000340000000002'}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should db err for item.find', function(done){
    var stub = Sinon.stub(Item, 'exec').yields(new Error());
    server.inject({method: 'GET', url: '/users/bobson', credentials: {_id: 'b00000000000000000000002'}}, function(response){
      expect(response.statusCode).to.equal(400);
      stub.restore();
      done();
    });
  });

  // it('should create a new user', function(done){
  //   server.inject({method: 'POST', url: '/users', payload: {email: 'lksd@lksd.com', password: 'dks', firstName: 'sdjf', lastName: 'ksdjf', company: 'lkjsdf', address: {street: '123 main', city: 'la', state: 'mo', zip: 57575}}}, function(response){
  //     expect(response.statusCode).to.equal(200);
  //     expect(response.result._id.toString()).to.have.length(24);
  //     done();
  //   });
  // });
});
