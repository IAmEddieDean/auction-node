'use strict';

var Auction = require('../../../models/auction');
var Client = require('../../../models/client');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/auctions',
    config: {
      validate: {
        payload: {
          name: Joi.string().min(3).required(),
          client: Joi.string().min(3).required()
        }
      },
      description: 'Create an auction',
      handler: function(request, reply){
        Client.findOne({displayName: request.payload.client}, function(err, client){
          if(!client || err){ return reply().code(400); }
          var auction = new Auction(request.payload);
          auction.clientId = client._id;
          auction.save();
          return reply(auction);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'auctions.create'
};
