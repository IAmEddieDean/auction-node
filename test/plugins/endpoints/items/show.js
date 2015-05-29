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

var server;

describe('GET /items', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });

  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });

  it('should find one item', function(done){
    server.inject({method: 'GET', url: '/items/e00000000000000000000001', headers: {authorization: 'Bearer ' + server.app.environment.LOCAL_TOKEN}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result._id.toString().length).to.equal(24);
      done();
    });
  });
  it('should cause db err', function(done){
    var stub = Sinon.stub(Item, 'findById').yields(new Error());
    server.inject({method: 'GET', url: '/items/e00000000000000000000001', headers: {authorization: 'Bearer ' + server.app.environment.LOCAL_TOKEN}}, function(response){
      expect(response.statusCode).to.equal(400);
      stub.restore();
      done();
    });
  });
});
