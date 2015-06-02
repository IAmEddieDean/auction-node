'use strict';

var Client = require('../../../models/client');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/clients',
    config: {
      description: 'Create a client',
      handler: function(request, reply){
        Client.find({displayName: request.payload.displayName}, function(err){
          if(err){ return reply().code(400); }
          var c = new Client(request.payload);
          c.save(function(){
            return reply(c);
          });
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'clients.create'
};
