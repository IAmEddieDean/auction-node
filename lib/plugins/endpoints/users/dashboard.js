'use strict';

var User = require('../../../models/user');
var Item = require('../../../models/item');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/users/{lastName}',
    config: {
      description: 'Get a users dashboard content',
      handler: function(request, reply){
        User.findOne({_id: request.auth.credentials._id}, function(err, user){
          if(!user || err){ return reply().code(400); }
          var dash = {};
          Item.find({_id: {$in: user.itemsBidOn}}).limit(3)
          .exec(function(er, items){
            if(er){ return reply().code(400); }
            dash.bidOn = items;
            Item.find({_id: {$in: user.itemsViewed}}).limit(3)
            .exec(function(errr, itms){
              if(errr){ return reply().code(400); }
              dash.viewed = itms;
              return reply(dash);
            });
          });
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users.dashboard'
};
