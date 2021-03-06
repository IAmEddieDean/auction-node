/* eslint no-reserved-keys: 0 */
'use strict';

var Mongoose = require('mongoose');
var Moment = require('moment');
var Item;

var itemSchema = Mongoose.Schema({
  title: {type: String, required: true},
  lot: {type: String, required: true},
  active: {type: Boolean, required: true, default: true},
  startPrice: {type: Number, required: true, default: 10},
  startTime: {type: Date, required: true, default: Moment().unix()},
  endTime: {type: Date, required: true, default: Moment().add(1, 'week').unix()},
  description: {type: String, required: true},
  photo: {type: Object},
  currentPrice: {type: Number},
  auction: {type: Mongoose.Schema.ObjectId, ref: 'Auction'},
  bids: [
    {
      _id: {type: Mongoose.Schema.ObjectId, ref: 'Bid', required: true},
      userId: {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
      amount: {type: Number, required: true},
      bidTime: {type: Date, required: true}
    }
  ]
});

Item = Mongoose.model('Item', itemSchema);
module.exports = Item;
