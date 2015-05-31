'use strict';

// var Auction = require('../../../models/auction');
var Item = require('../../../models/item');
var User = require('../../../models/user');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/items/{itemId}',
    config: {
      validate: {
        payload: {
          bid: Joi.number().required()
        },
        params: {
          itemId: Joi.string()
        }
      },
      description: 'bid on an item',
      handler: function(request, reply){
        Item.findById({_id: request.params.itemId}, function(err, item){
          if(!item || err){ return reply().code(400); }
          User.findById(request.auth.credentials._id, function(er, user){
            if(!user || user.role < 1 || (request.payload.bid < item.currentPrice) || err){ return reply().code(400); }
            var bid = {};
            var bidOn = {};
            item.currentPrice = request.payload.bid;
            bid.userId = request.auth.credentials._id;
            bid.amount = request.payload.bid;
            bid.bidTime = Date.now();
            item.bids.push(bid);
            bidOn.itemId = item._id;
            user.itemsBidOn.push(item._id);
            console.log(user.itemsBidOn);
            item.save(function(){
              user.save(function(){
                return reply({item: item, user: user});
              });
            });
          });
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'items.bid'
};
