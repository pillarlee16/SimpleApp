define([
	// lib
	"backbone",
	// model
	"model/Person",
	// template
	"text!template/dataInputView.tmpl"
], function (Backbone, Person, dataInputViewTmpl) {
	var DataInputView = Backbone.View.extend({
		el: "#data-input",
		
		template: _.template(dataInputViewTmpl),
		 
		events: {
			"click button.add_btn": "addPerson"
		},
		
		initialize: function () {
			this.id = 0;
		},
		
		render: function () {
			this.$el.html(this.template());
			return this;
		},
		
		addPerson: function () {
			var name = this.$el.find("input[name=name]").val();
			var part = this.$el.find("input[name=part]").val();
			
			var person = new Person({
				"id": ++this.id,
				"name": name,
				"part": part
			});
			
			this.collection.add(person);
		}
	});
	return DataInputView;
});

