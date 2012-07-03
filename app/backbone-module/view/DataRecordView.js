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