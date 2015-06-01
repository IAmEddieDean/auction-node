'use strict';

var User = require('../../../models/user');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/users',
    config: {
      description: 'retrieve all users',
      handler: function(request, reply){
        User.find({}, function(err, users){
          return reply(users).code(err ? 400 : 200);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users.index'
};
