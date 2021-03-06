// /* eslint no-unused-expressions: 0 */
//
// 'use strict';
//
// var Chai = require('chai');
// var Lab = require('lab');
// var Mongoose = require('mongoose');
// var Server = require('../../../../lib/server');
// // var Sinon = require('sinon');
// // var Auction = require('../../../../lib/models/auction');
//
// var lab = exports.lab = Lab.script();
// var describe = lab.experiment;
// var expect = Chai.expect;
// var it = lab.test;
// var before = lab.before;
// var after = lab.after;
// var CP = require('child_process');
// var Path = require('path');
// var beforeEach = lab.beforeEach;
//
// var server;
//
// describe('PUT /items', function(){
//   before(function(done){
//     Server.init(function(err, srvr){
//       if(err){ throw err; }
//       server = srvr;
//       done();
//     });
//   });
//
//   beforeEach(function(done){
//     var db = server.app.environment.MONGO_URL.split('/')[3];
//     console.log(db);
//     CP.execFile(Path.join(__dirname, '../../../../scripts/clean-db.sh'), [db], {cwd: Path.join(__dirname, '../../../../scripts')}, function(){
//       done();
//     });
//   });
//
//   after(function(done){
//     server.stop(function(){
//       Mongoose.disconnect(done);
//     });
//   });
//
//   it('should find an item and user', function(done){
//     server.inject({method: 'PUT', url: '/items/e00000000000000000000001', credentials: {_id: 'b00000000000000000000003'}, payload: {bid: 62}}, function(response){
//       expect(response.statusCode).to.equal(200);
//       expect(response.result.item._id.toString()).to.equal('e00000000000000000000001');
//       expect(response.result.user._id.toString()).to.equal('b00000000000000000000003');
//       done();
//     });
//   });
//   it('should error for not finding an item', function(done){
//     server.inject({method: 'PUT', url: '/items/e00000000000000000000357', credentials: {_id: 'b00000000000000000000003'}, payload: {bid: 62}}, function(response){
//       expect(response.statusCode).to.equal(400);
//       done();
//     });
//   });
//   it('should error for not finding a user', function(done){
//     server.inject({method: 'PUT', url: '/items/e00000000000000000000001', credentials: {_id: 'b00000000000670000000003'}, payload: {bid: 62}}, function(response){
//       expect(response.statusCode).to.equal(400);
//       done();
//     });
//   });
//   it('should error for user role being too low', function(done){
//     server.inject({method: 'PUT', url: '/items/e00000000000000000000001', credentials: {_id: 'b00000000000000000000001'}, payload: {bid: 62}}, function(response){
//       expect(response.statusCode).to.equal(400);
//       done();
//     });
//   });
//   it('should error for bid being too low', function(done){
//     server.inject({method: 'PUT', url: '/items/e00000000000000000000001', credentials: {_id: 'b00000000000000000000003'}, payload: {bid: 2}}, function(response){
//       expect(response.statusCode).to.equal(400);
//       done();
//     });
//   });
// });
