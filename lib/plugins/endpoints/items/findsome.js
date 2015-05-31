'use strict';

var Item = require('../../../models/item');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/items/8',
    config: {
      auth: false,
      description: 'get up to 8 items',
      handler: function(request, reply){
        Item.find().limit(8).exec(function(err, items){
          return reply(items).code(err ? 400 : 200);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'items.findsome'
};
