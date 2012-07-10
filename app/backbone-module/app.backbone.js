$(function () {
	// instances
	var personList = new PersonList();
	
	var dataInputView = new DataInputView({"collection": personList});
	var dataListView = new DataListView({"collection": personList});
	
	// render view
	dataInputView.render();
	dataListView.render();
});