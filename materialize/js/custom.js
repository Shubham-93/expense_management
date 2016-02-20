var all_items = [];
$('select').material_select();
$("#price").keypress(function(event) {
    if (event.which == 13) {
        newEntry();
     }
});

function newEntry() {
	var name = $("select").val();
	var item = $("#item").val();
	var price = $("#price").val();
	if(name !== null
		&& price !== "") {
		$("#warning").text("");
		var item = item == ""?"_":item;
		var data = {
			'name': name,
			'item': item,
			'price': price
		}
		all_items.push(data);
		calculate();
		var html = '<div class="col s4">'+name+'</div>'+
			      '<div class="col s4">'+item+'</div>'+
			      '<div class="col s4">'+price+'</div>';
		$("#list-mate").append(html);
	} else {
		$("#warning").text("Please update all information.");
	}
	clearValue();
}

var total = 0;
function calculate() {
	total = 0;
	for(var data of all_items) {
		total += parseInt(data.price);
	}
	$("#add").text(total);
}

function clearValue() {
	// $("select").val("");
	$("#item").val("");
	$("#price").val("");
}

function totalFare() {
	if(all_items.length > 0) {
		var option = [];
		$("select option").each(function(){
		    option.push($(this).val());
		});

		for(var each of option) {
			var result = $.grep(all_items, function(e){
				return e.name == each;
			});
			// if (result.length) {
				var spendByOne = 0;
				for(var ind of result) {
					spendByOne += parseInt(ind.price);
				}

				var html = '<div class="col s4" name="'+each+'">'+each+'</div>'+
					      '<div class="col s4" fare="'+each+'_fare">'+spendByOne+'</div>'+
							'<div class="col s4" name="'+each+'_deb">'+(Math.round(total/option.length)-spendByOne)+'</div>';

				$("[fare='"+each+"_fare']").length?$("[fare='"+each+"_fare']").text(spendByOne):$("#result").append(html);
				$("[name='"+each+"_deb']").length?$("[name='"+each+"_deb']").text(Math.round((total/option.length)-spendByOne)):$("#result").append(html);
				

			// };
		}
	}
}

function analysis() {

}