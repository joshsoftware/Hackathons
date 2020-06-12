var token = $.cookie('token')
$(document).ready(function() {
	
    if(token == undefined){
			$(".nav").hide();
		}
			App.init();
});

