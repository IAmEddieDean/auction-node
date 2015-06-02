/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');
var Sinon = require('sinon');
var Item = require('../../../../lib/models/item');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;
var before = lab.before;
var after = lab.after;
var beforeEach = lab.beforeEach;
var CP = require('child_process');
var Path = require('path');

var server;

describe('GET /items/8', function(){
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

  it('should find 8 items', function(done){
    server.inject({method: 'GET', url: '/items/8'}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.length).to.equal(8);
      done();
    });
  });
  // it('should cause db err', function(done){
  //   var stub = Sinon.stub(Item, 'find').yields(new Error());
  //   server.inject({method: 'GET', url: '/items/8'}, function(response){
  //     expect(response.statusCode).to.equal(400);
  //     stub.restore();
  //     done();
  //   });
  // });
});
