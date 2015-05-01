
var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);
Session.set('frame', 1);

var CONNECTION_ISSUE_TIMEOUT = 5000;

Meteor.startup(function () {

  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(function () {
    // Launch screen handle created in lib/router.js
    dataReadyHold.release();

    // Show the connection error box
    Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
  }, CONNECTION_ISSUE_TIMEOUT);
});

Template.appBody.onRendered(function() {
  
});

Template.appBody.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes. #each looks at the _id property of it's
  // items to know when to insert a new item and when to update an old one.
  time: function() {
    return Session.get('time');
  },
  frame: function() {
    return Session.get('frame');
  },
  users: function() {
    users = Meteor.users.find({}).fetch();
    return users;
  },
  username: function() {
    var email = this.emails[0].address;
    return email.substring(0, email.indexOf('@'));
  },
  thisArray: function() {
    return [this];
  },
  cordova: function() {
    return Meteor.isCordova && 'cordova';
  },
  connected: function() {
    if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
      return Meteor.status().connected;
    } else {
      return true;
    }
  }
});

var getTime = function() {
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var now = date + ' ' + hour + ":" + minute;
  return now;
};

Meteor.setInterval(function() {
  var time = getTime();
  if (frame === undefined) var frame = 1;
  frame = Session.get('frame');
  frame++;
  //console.log(time);
  Session.set('time', time);
  Session.set('frame', frame);

}, 1000);

Template.appBody.events({
  'click .navbar-brand': function() {
    console.log(Session.get('frame'));
  }
});
