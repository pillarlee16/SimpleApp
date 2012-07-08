define([
	// lib
	"backbone"
], function (Backbone) {
	var Person = Backbone.Model.extend({
	    getName: function () {
	        return this.get("name");
	    },
	    getPart: function () {
	        return this.get("part");
	    }
	    
	});
	return Person;
});
