$(function () {
	// model
	var Person = Backbone.Model.extend({
	});
	
	// collection
	var PersonList = Backbone.Collection.extend({
		model: Person
	});
	
	// view
	var DataInputView = Backbone.View.extend({
		el: "#data-input",
		
		template: _.template($("#data-input-template").html()),
		 
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
	
	var DataListView = Backbone.View.extend({
		el: "#data-list",
		
		template: _.template($("#data-list-template").html()),
		
		initialize: function () {
			this.collection.on("add", this.addRecord, this);
		},
		
		render: function () {
			this.$el.html(this.template());
			return this;
		},
		
		addRecord: function (person) {
			var record = new DataRecordView({"model": person});
			this.$el.find("tbody").append(record.render().$el);
		}
	});
	
	var DataRecordView = Backbone.View.extend({
		tagName: "tr",
		
		template: _.template($("#data-record-template").html()),
		
		events: {
			"click button.delete_btn": "deletePerson"
		},

		render: function () {
			this.$el.html(this.template({
				"id": this.model.get("id"),
				"name": this.model.get("name"),
				"part": this.model.get("part")
			}));
			return this;
		},
		
		deletePerson: function () {
			this.model.collection.remove(this.model);
			this.remove();
		}
	});
	
	// instances
	var personList = new PersonList();
	
	var dataInputView = new DataInputView({"collection": personList});
	var dataListView = new DataListView({"collection": personList});
	
	// render view
	dataInputView.render();
	dataListView.render();
	
});