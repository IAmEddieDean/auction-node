/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');
var Sinon = require('sinon');
var User = require('../../../../lib/models/user');
var CP = require('child_process');
var Path = require('path');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;
var before = lab.before;
var after = lab.after;
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
    CP.execFile(Path.join(__dirname, '../../../../scripts/clean-db.sh'), [db], {cwd: Path.join(__dirname, '../../../../scripts')}, function(){
      done();
    });
  });

  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });

  it('should find all users', function(done){
    server.inject({method: 'GET', url: '/users', headers: {authorization: 'Bearer ' + server.app.environment.LOCAL_TOKEN}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.length).to.equal(5);
      done();
    });
  });
  it('should err for no token', function(done){
    server.inject({method: 'GET', url: '/users'}, function(response){
      expect(response.statusCode).to.equal(401);
      done();
    });
  });
  it('should cause db err', function(done){
    var stub = Sinon.stub(User, 'find').yields(new Error());
    server.inject({method: 'GET', url: '/users', headers: {authorization: 'Bearer ' + server.app.environment.LOCAL_TOKEN}}, function(response){
      expect(response.statusCode).to.equal(400);
      stub.restore();
      done();
    });
  });
});
