
// Track if this is the first time the list template is rendered
var firstRender = true;
var listRenderHold = LaunchScreen.hold();
listFadeInHold = null;

Template.resources.onRendered(function() {
  if (firstRender) {
    // Released in app-body.js
    listFadeInHold = LaunchScreen.hold();

    // Handle for launch screen defined in app-body.js
    listRenderHold.release();

    firstRender = false;
  }

  console.log(Meteor.userId()) ;
  var userId = Meteor.userId() ;
  // var singleressource = Resources.find({id: 1}).fetch();
  // console.log(singleressource);

    // console.log(userId);
    // var data = [
    //   {
    //   user_id: userId,
    //   name: "wood",
    //   value: 22,
    //   types: [
    //     "logs",
    //     "planks",
    //     "sticks",
    //     "paper"
    //     ]
    //   },
    //   {
    //   user_id: userId,
    //   name: "minerals",
    //   value: 22,
    //   types: [
    //     "Gold",
    //     "Coal",
    //     "Rock",
    //     "Iron"
    //     ]
    //   },
    //   {
    //   user_id: userId,
    //   name: "food",
    //   value: 22,
    //   types: [
    //     "Cow",
    //     "Chicken",
    //     "Water",
    //     "Tomatoe"
    //     ]
    //   },
    //   {
    //   user_id: userId,
    //   name: "people",
    //   value: 22,
    //   types: [
    //     "Axe",
    //     "Farm",
    //     "Mine",
    //     "Warrior"
    //     ]
    //   }
    // ];

    // var timestamp = (new Date()).getTime();
    // _.each(data, function(resource) {
    //   var resource_id = Resources.insert({
    //     user_id: resource.user_id,
    //     name: resource.name,
    //     value: resource.value,
    //     types: resource.types
    //   });
    //   console.log(resource_id);
    // });

});

Template.resources.helpers({

  resourcesReady: function() {
    return Router.current().resourcesHandle.ready();
  },

  resources: function() {
    return Resources.find({});
  }
});

var addUserId = function(resource) {

  if (resource.userId) {
    Resources.update(resource._id, {$unset: {userId: true}});
  } else {
    Resources.update(resource._id, {$set: {userId: Meteor.userId()}});
  }
};

Template.resources.events({
});
