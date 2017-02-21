import {Backbone} from '~/src/vendor/libs';
const User = Backbone.Model.extend({

});
var user = null;

function getCurrentUser(){
  var deferred = $.Deferred();

  if (user) {
    deferred.resolve(user);
  } else {
    user =  new User();
    user.set({
      name: 'Jose'
    })
    deferred.resolve(user);
  }
  return deferred.promise();
}

export default {
    getCurrentUser
};
