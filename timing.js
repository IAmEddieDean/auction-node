'use strict';

var mongoose = require('mongoose');
var Item = require('./lib/models/item');
// var ClosedItem = require('./lib/models/closeditem');
var moment = require('moment');
mongoose.connect('mongodb://localhost/auction-dev');

setInterval(checkTime, 2500);

function checkTime(){
  Item.find({}, function(err, items){
    if(err){ return; }
    items.forEach(function(i){
      var now = moment().unix();
      if(moment(i.endTime).unix() <= now){
        i.active = false;
        i.save(function(er){
          if(!er){ return; }
        });
      }
      return;
    });
  });
}
