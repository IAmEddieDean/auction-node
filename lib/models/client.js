/* eslint no-reserved-keys: 0 */

'use strict';

var Mongoose = require('mongoose');

var Client;

var clientSchema = Mongoose.Schema({
  firstName: {type: String, uppercase: true, required: true},
  lastName: {type: String, uppercase: true, required: true},
  displayName: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: Number, required: true},
  createdAt: {type: Date, default: Date.now, required: true},
  address: {
    street: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: Number, required: true}
  },
  auctions: [
    {type: Mongoose.Schema.ObjectId, ref: 'Auction'}
  ]
});

Client = Mongoose.model('Client', clientSchema);
module.exports = Client;
