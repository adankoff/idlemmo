
// Track if this is the first time the list template is rendered
var firstRender = true;
var listRenderHold = LaunchScreen.hold();
listFadeInHold = null;

Template.people.onRendered(function() {

	if (firstRender) {
		// Released in app-body.js
		listFadeInHold = LaunchScreen.hold();

		// Handle for launch screen defined in app-body.js
		listRenderHold.release();

		firstRender = false;
	}

	//Check if user has any people
	console.log(people);
	var userId = Meteor.userId();
	var countPeople = People.find({user_id: userId}).count();
	var countAllPeople = People.find({}).count();
	console.log(countPeople + ' ' + countAllPeople);
	if(!countPeople) {
	  	var data = 
	  		{
	  			user_id: userId,
	  			total: 10,
	  			woodsman: [
	  				{
				  		total: 0,
				  		types: [
					  		"logging",
					  		"planking",
					  		"sticking",
					  		"building"
				  		]
				  	}
				],
				miner: [
	  				{
				  		total: 0,
				  		types: [
					  		"gold",
					  		"coal",
					  		"rock",
					  		"iron",
					  		"forge"
				  		]
				  	}
				],
				forager: [
	  				{
				  		total: 0,
				  		types: [
					  		"hunter",
					  		"gatherer",
					  		"farmer",
					  		"medic"
				  		]
				  	}
				],
				warriors: [
	  				{
				  		total: 0,
				  		types: [
					  		"archer",
					  		"swordsman",
					  		"spearmen",
					  		"knight"
				  		]
				  	}
				]
	  		}
		;
		console.log(data);
		var people_id = People.insert(data);
		console.log(people_id);
		var people = People.find().fetch();
		console.log(people);
	} else {
		var people = People.find({user_id: userId}).fetch();
		console.log(people);
	}

  // console.log(Meteor.userId()) ;
  // var userId = Meteor.userId() ;
  // var singleressource = Resources.find({id: 1}).fetch();
  // console.log(singleressource);

  // console.log(userId);

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

Template.people.helpers({

	peopleReady: function() {
		return Router.current().peopleHandle.ready();
	},

	people: function() {
		return People.find({});
	}
});

var addUserId = function(resource) {

	if (resource.userId) {
		Resources.update(resource._id, {$unset: {userId: true}});
	} else {
		Resources.update(resource._id, {$set: {userId: Meteor.userId()}});
	}
};

Template.people.events({
});
