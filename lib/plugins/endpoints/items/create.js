'use strict';

var Auction = require('../../../models/auction');
var Item = require('../../../models/item');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/items',
    config: {
      validate: {
        payload: {
          title: Joi.string().min(3).required(),
          lot: Joi.string().min(1).required(),
          startPrice: Joi.number().positive().min(1).required(),
          endTime: Joi.date(),
          startTime: Joi.date(),
          auction: Joi.string().required(),
          description: Joi.string().required(),
          photo: Joi.object().keys({
            base64: Joi.string(),
            filename: Joi.string(),
            filesize: Joi.number(),
            filetype: Joi.string()
          })
        }
      },
      description: 'post an item',
      handler: function(request, reply){
        Auction.findOne({name: request.payload.auction}, function(err, auction){
          if(!auction || err){ return reply().code(400); }
          var item = new Item(request.payload);
          item.auction = auction._id;
          return reply(item);
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'items.create'
};
