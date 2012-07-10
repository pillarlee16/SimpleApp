define([
	// lib
	"backbone",
	// model
	"model/Person"
], function (Backbone, Person) {
	var PersonList = Backbone.Collection.extend({
		model: Person
	});
	return PersonList;
});