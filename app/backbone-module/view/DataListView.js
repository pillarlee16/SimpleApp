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