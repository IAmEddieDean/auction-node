/* eslint no-use-before-define: 0 */
/* eslint no-else-return: 0 */
/* eslint no-lonely-if: 0 */

'use strict';

// var Auction = require('../../../models/auction');
var Item = require('../../../models/item');
var User = require('../../../models/user');
var Bid = require('../../../models/bid');
var Joi = require('joi');
var _ = require('lodash');

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
        Item.findOne({_id: request.params.itemId}, function(err, item){
          var minBid = calcMin(item);
          if(!item || err || (request.payload.bid < minBid)){ return reply(err); }
          User.findById(request.auth.credentials._id, function(er, user){
            if(!user || user.role < 1 || er){ return reply(er); }
            var b = {};
            b.userId = user._id;
            b.amount = request.payload.bid;
            var newBid = new Bid(b);
            if(item.bids[0] && (newBid.userId.toString() === item.bids[0].userId.toString())){
              item.bids.unshift(newBid);
            }else{
              var newCurrentPrice = calcNewPrice(item, newBid);
              if(item.bids[0] && newCurrentPrice > item.bids[0].amount){
                item.bids.unshift(newBid);
                item.currentPrice = newCurrentPrice;
              }else{
                item.bids.push(newBid);
                item.currentPrice = newCurrentPrice;
              }
            }
            user.itemsBidOn.push(item._id);
            user.itemsBidOn = _.flatten(user.itemsBidOn);
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

function calcMin(item){
  return item.bids[0] ? item.currentPrice * 1.05 : item.startPrice;
}

function calcNewPrice(item, newBid){
  if(!item.bids[0]){
    return item.startPrice;
  }
  var oldBidAmount = item.bids[0].amount;
  var newBidAmount = newBid.amount;
  if(newBidAmount > oldBidAmount){
    if(newBidAmount >= oldBidAmount * 1.05){
      return oldBidAmount * 1.05;
    }else{
      return newBidAmount;
    }
  }else if(newBidAmount === oldBidAmount){
    return oldBidAmount;
  }else{
    if(oldBidAmount >= newBidAmount * 1.05){
      return newBidAmount * 1.05;
    }else{
      return oldBidAmount;
    }
  }
}
