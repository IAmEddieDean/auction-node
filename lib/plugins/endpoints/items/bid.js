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
        User.findOne({_id: request.auth.credentials._id}, function(err, user){
          if(!user || err){ return reply().code(400); }
          var itemId;
          var i;
          if(user.role > 0){
            Item.findOne({_id: request.params.itemId}, function(er, item){
              // if(!item || er){ return reply().code(400); }
              var bid = request.payload.bid;
              if(bid >= (item.currentPrice * 1.05)){
                item.currentPrice = bid;
                var b = {};
                b.userId = user._id;
                b.amount = bid;
                b.bidTime = Date.now();
                item.bids.push(b);
                itemId = item._id;
                i = item;
                item.save();
              }
            });
            user.itemsBidOn.push(itemId);
            user.save();
          }
          return reply({user: user, item: i});
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'items.bid'
};
