// /* eslint no-unused-expressions: 0 */
//
// 'use strict';
//
// var Chai = require('chai');
// var Lab = require('lab');
// var Mongoose = require('mongoose');
// var Server = require('../../../../lib/server');
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
// describe('PUT /auctions', function(){
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
//     CP.execFile(Path.join(__dirname, '../../../../../scripts/clean-db.sh'), [db], {cwd: Path.join(__dirname, '../../../../../scripts')}, function(){
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
//   it('should find a client', function(done){
//     server.inject({method: 'PUT', url: '/auctions', headers: {authorization: 'Bearer ' + server.app.environment.LOCAL_TOKEN}}, function(response){
//       expect(response.statusCode).to.equal(200);
//       done();
//     });
//   });

  // it('should create a new user', function(done){
  //   server.inject({method: 'POST', url: '/users', payload: {email: 'lksd@lksd.com', password: 'dks', firstName: 'sdjf', lastName: 'ksdjf', company: 'lkjsdf', address: {street: '123 main', city: 'la', state: 'mo', zip: 57575}}}, function(response){
  //     expect(response.statusCode).to.equal(200);
  //     expect(response.result._id.toString()).to.have.length(24);
  //     done();
  //   });
  // });
// });
