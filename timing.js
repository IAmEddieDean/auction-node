var mongoose = require('mongoose');
var Item = require('./lib/models/item');
var moment = require('moment');
mongoose.connect('mongodb://localhost/auction-dev');

setInterval(checkTime, 1000);





function checkTime(){
  
  Item.find({}, function(err, items){
    items.forEach(function(i){
      console.log(new Date(i.endTime * 1000));
      return;
    });
  });
}

  // var end = moment(items[0].endTime).unix();
  // console.log(end);
