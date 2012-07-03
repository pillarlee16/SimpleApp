define([
	// lib
	"backbone",
	// view
	"view/DataRecordView",
	// template
	"text!template/dataListView.tmpl"
], function (Backbone, DataRecordView, dataListViewTmpl) {
	var DataListView = Backbone.View.extend({
		el: "#data-list",
		
		template: _.template(dataListViewTmpl),
		
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
	return DataListView;
});
