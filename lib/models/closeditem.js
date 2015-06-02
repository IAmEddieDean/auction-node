// /* eslint no-reserved-keys: 0 */
// 'use strict';
//
// var Mongoose = require('mongoose');
// var Moment = require('moment');
// var ClosedItem;
//
// var itemSchema = Mongoose.Schema({
//   title: {type: String, required: true},
//   lot: {type: String, required: true},
//   active: {type: Boolean, required: true, default: false},
//   startPrice: {type: Number, required: true},
//   startTime: {type: Date, required: true},
//   endTime: {type: Date, required: true},
//   description: {type: String, required: true},
//   photo: {type: Object},
//   currentPrice: {type: Number},
//   auction: {type: Mongoose.Schema.ObjectId, ref: 'Auction'},
//   bids: [
//     {
//       _id: {type: Mongoose.Schema.ObjectId, ref: 'Bid', required: true},
//       userId: {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
//       amount: {type: Number, required: true},
//       bidTime: {type: Date, required: true}
//     }
//   ]
// });
//
// ClosedItem = Mongoose.model('ClosedItem', itemSchema);
// module.exports = ClosedItem;
