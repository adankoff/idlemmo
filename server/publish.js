Meteor.publish('usersAll', function() {
  return Meteor.users.find({});
});

Meteor.publish('peopleAll', function() {
  return People.find();
});

Meteor.publish('resourcesAll', function() {
  return Resources.find();
});

// Meteor.publish('publicLists', function() {
//   return Lists.find({userId: {$exists: false}});
// });

// Meteor.publish('privateLists', function() {
//   if (this.userId) {
//     return Lists.find({userId: this.userId});
//   } else {
//     this.ready();
//   }
// });

// Meteor.publish('todos', function(listId) {
//   check(listId, String);

//   return Todos.find({listId: listId});
// });
