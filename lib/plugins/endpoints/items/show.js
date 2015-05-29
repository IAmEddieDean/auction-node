'use strict';

var Item = require('../../../models/item');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/items/{id}',
    config: {
      auth: false,
      description: 'get one item',
      handler: function(request, reply){
        Item.findById(request.params.id, function(err, item){
          return reply(item).code(err ? 400 : 200);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'items.show'
};
