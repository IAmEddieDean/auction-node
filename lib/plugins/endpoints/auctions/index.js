'use strict';

var Auction = require('../../../models/auction');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/auctions',
    config: {
      description: 'retrieve all auctions',
      handler: function(request, reply){
        Auction.find({}, function(err, auctions){
          return reply(auctions).code(err ? 400 : 200);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'auctions.index'
};
