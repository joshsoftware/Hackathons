
function resetFields(){
  $('form')[0].reset();
  $("input[type=text], textarea").removeClass('parsley-success').removeClass('parsley-error');
  $('.parsley-errors-list li').empty();
  $('select').each(function() {
    this.selectedIndex=0;
  });
  $('select').removeClass('parsley-success');
  $('select').removeClass('parsley-error');
}


function showLoader(){
  $("#page-loader").removeClass("hide");
}
function hideLoader(){
  $("#page-loader").removeClass("show");
  $("#page-loader").addClass("hide");
}

function showModalLoader(){
  $("#modal-loader").removeClass("hide");
  $("#modal-loader").addClass("show");
}
function hideModalLoader(){
  $("#modal-loader").removeClass("show");
  $("#modal-loader").addClass("hide");
}

//function to get url parameters
function getUrlParameter(sParam){
	var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
    	var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

$('.userName').text($.cookie('Name'));

$(document).ready(function() {
  $( document ).on( 'focus', ':input', function(){
        $( this ).attr( 'autocomplete', 'off' );
  });
});
