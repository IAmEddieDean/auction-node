/* eslint handle-callback-err: 0 */
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
        Item.find({active: true}, function(err, items){
          // if(err){ return reply().code(400); }
          return reply(items);
        }).limit(8);
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'items.findsome'
};
