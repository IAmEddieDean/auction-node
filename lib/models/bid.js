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
