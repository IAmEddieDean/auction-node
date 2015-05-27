'use strict';

var User = require('../../../models/user');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/users',
    config: {
      auth: false,
      description: 'Create a user',
      handler: function(request, reply){
        User.register(request.payload, function(err, user){
          if(!user || err){ return reply().code(400); }
          user.password = null;
          return reply(user);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users.create'
};
