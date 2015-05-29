/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');
var Client = require('../../../../lib/models/client');
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

describe('POST /auctions', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });

  beforeEach(function(done){
    var db = server.app.environment.MONGO_URL.split('/')[3];
    console.log(db);
    CP.execFile(Path.join(__dirname, '../../../../scripts/clean-db.sh'), [db], {cwd: Path.join(__dirname, '../../../../scripts')}, function(){
      done();
    });
  });

  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });

  it('should find a client', function(done){
    server.inject({method: 'POST', url: '/auctions', credentials: {userId: 'b00000000000000000000003'}, payload: {name: 'test', client: 'JohnsCons'}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.clientId.toString()).to.equal('c00000000000000000000002');
      done();
    });
  });

  it('should create a new auction', function(done){
    server.inject({method: 'POST', url: '/auctions', credentials: {userId: 'b00000000000000000000003'}, payload: {name: 'test', client: 'JohnsCons'}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.name).to.equal('test');
      done();
    });
  });
  it('should throw a db error on client find', function(done){
    var stub = Sinon.stub(Client, 'findOne').yields(new Error());
    server.inject({method: 'POST', url: '/auctions', credentials: {userId: 'b00000000000000000000003'}, payload: {name: 'test', client: 'JohnsCons'}}, function(response){
      expect(response.statusCode).to.equal(400);
      stub.restore();
      done();
    });
  });
  it('should fail joi validation', function(done){
    server.inject({method: 'POST', url: '/auctions', credentials: {userId: 'b00000000000000000000003'}, payload: {client: 'JohnsCons'}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
});
