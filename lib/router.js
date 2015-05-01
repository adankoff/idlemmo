Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('usersAll'),
      Meteor.subscribe('resourcesAll')
    ];
  }
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join']});
  Router.onBeforeAction('dataNotFound', {except: ['join']});
}

Router.map(function() {
  this.route('join');

  this.route('people', {
    path: '/people/',
    // subscribe to todos before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function () {
      this.peopleHandle = Meteor.subscribe('peopleAll');

      if (this.ready()) {
        // Handle for launch screen defined in app-body.js
        dataReadyHold.release();
      }
    },
    data: function () {
      return People.find({});
    },
    action: function () {
      this.render();
    }
  });

  this.route('resources', {
    path: '/resources/',
    // subscribe to todos before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function () {
      this.resourcesHandle = Meteor.subscribe('resourcesAll');

      if (this.ready()) {
        // Handle for launch screen defined in app-body.js
        dataReadyHold.release();
      }
    },
    data: function () {
      return Resources.find({});
    },
    action: function () {
      this.render();
    }
  });

  this.route('home', {
    path: '/',
    action: function() {
      Router.go('people');
    }
  });
});

var loginRequired = function(pause) {
      if (!Meteor.userId()) {
        this.render('join');
        return pause();
      }
};

Router.onBeforeAction(loginRequired, {
    only: ['resources', 'anotherPriveRoute']
});