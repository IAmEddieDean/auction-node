/* eslint no-reserved-keys: 0 */
'use strict';

var Mongoose = require('mongoose');
var Moment = require('moment');
var Bid;

var bidSchema = Mongoose.Schema({
  userId: {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
  amount: {type: Number, required: true},
  bidTime: {type: Date, required: true, default: Moment().unix()}
});

Bid = Mongoose.model('Bid', bidSchema);
module.exports = Bid;









// Item.findOne({_id: request.params.itemId}, function(err, item){
//   // var error = reply().code(400);
//   var minBid = calcMin(item);
//   if(!item || err || (request.payload.bid < minBid)){ return reply(err); }
//   // if(request.payload.bid < minBid){ return error; }
//   User.findById(request.auth.credentials._id, function(er, user){
//     if(!user || user.role < 1 || er){ return reply(er); }
//     var b = {};
//     b.userId = user._id;
//     b.amount = request.payload.bid;
//     var newBid = new Bid(b);
//     if(item.bids[0] && newBid.userId === item.bids[0].userId){
//       item.bids.shift(newBid);
//     }else{
//       var newCurrentPrice = calcNewPrice(item, newBid);
//       if(newCurrentPrice > item.bids[0].amount){
//         item.bids.shift(newBid);
//       }else{
//         item.bids.push(newBid);
//       }
//       item.currentPrice = newCurrentPrice;
//     }
//     user.itemsBidOn.push(item._id);
//     user.itemsBidOn = _.flatten(user.itemsBidOn);
//     item.save(function(){
//       user.save(function(){
//         return reply({item: item, user: user});
//       });
//     });
//   });
// });
