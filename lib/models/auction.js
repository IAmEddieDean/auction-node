/* eslint no-reserved-keys: 0 */

'use strict';

var Mongoose = require('mongoose');

var Auction;

var auctionSchema = Mongoose.Schema({
  name: {type: String, required: true},
  clientId: {type: Mongoose.Schema.ObjectId, ref: 'Client', required: true},
  items: [
    {type: Mongoose.Schema.ObjectId, ref: 'Item'}
  ]
});

Auction = Mongoose.model('Auction', auctionSchema);
module.exports = Auction;
