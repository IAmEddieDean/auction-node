'use strict';

var Item = require('../../../models/item');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/items',
    config: {
      auth: false,
      description: 'get index of items',
      handler: function(request, reply){
        Item.find({active: true}, function(err, items){
          return reply(items).code(err ? 400 : 200);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'items.index'
};
