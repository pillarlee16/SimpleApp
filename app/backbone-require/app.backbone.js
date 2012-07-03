require.config({
	paths: {
		"jquery": "../../asset/js/jquery-1.7.2",
		"underscore" : "../../asset/js/underscore",
		"backbone": "../../asset/js/backbone",
		"text": "../../asset/js/text"
	}
});

define([
	// lib
	"jquery",
	// collection
	"collection/PersonList",
	// view
	"view/DataInputView",
	"view/DataListView"
], function ($, PersonList, DataInputView, DataListView) {
	
	$(function () {
		// instances
		var personList = new PersonList();
		
		var dataInputView = new DataInputView({"collection": personList});
		var dataListView = new DataListView({"collection": personList});
		
		// render view
		dataInputView.render();
		dataListView.render();
	});

});