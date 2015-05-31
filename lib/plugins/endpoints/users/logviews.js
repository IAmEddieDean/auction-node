'use strict';

var User = require('../../../models/user');
var _ = require('lodash');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/users',
    config: {
      description: 'Save a users visited items',
      handler: function(request, reply){
        User.findOne({_id: request.auth.credentials._id}, function(err, user){
          if(!user || err){ return reply().code(400); }
          user.itemsViewed.push(request.payload.itemId);
          user.itemsViewed = _.flatten(user.itemsViewed);
          user.save(function(){
            return reply(user);
          });
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users.logviews'
};
