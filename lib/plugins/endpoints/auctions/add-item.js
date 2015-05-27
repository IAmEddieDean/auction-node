'use strict';

// var Auction = require('../../../models/auction');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/auctions',
    config: {
      description: 'post an item',
      handler: function(request, reply){
        
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'auctions.additem'
};
