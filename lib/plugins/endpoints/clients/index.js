'use strict';

var Client = require('../../../models/client');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/clients',
    config: {
      auth: false,
      description: 'retrieve all clients',
      handler: function(request, reply){
        Client.find({}, function(err, clients){
          return reply(clients).code(err ? 400 : 200);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'clients.index'
};
