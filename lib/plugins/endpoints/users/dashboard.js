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
          Item.find({_id: {$in: user.itemsBidOn}}).limit(3)
          .exec(function(er, items){
            return reply({bidOn: items});
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
