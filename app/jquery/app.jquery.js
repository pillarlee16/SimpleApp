	$(function () {
		var id = 0;
		
		var $addBtn = $("#data-input button.add_btn");
		$addBtn.click(function () {
			var name = $("#data-input input[name=name]").val();
			var part = $("#data-input input[name=part]").val();
			
			var $row = $("<tr><td>"+(++id)+"</td><td>"+name+"</td><td>"+part+"</td><td><button type=\"button\" class=\"btn delete_btn\">Delete</button></td></tr>");
			
			$deleteBtn = $row.find("button.delete_btn");
			$deleteBtn.click(function (event) {
				var $target = $(event.target).parent().parent();
				$target.remove();
			});
			
			$("#data-list table tbody").append($row);
		});
	});