$(document).ready(function() {
    App.init();
   
    $("#loginForm").submit(function(e){
          e.preventDefault();
    });
    $('#btnLogin').on('click', function(){
      login();
    });
});

function login(){
  $.gritter.removeAll();
  var validationFlag = true;
  if($('#txtEmail').val() == '' || $('#txtPassword').val() == ''){
    validationFlag = false; 
  }
  if($('#txtEmail').val() == ''){
    $('#divEmail').addClass('has-error');
  }
  else{
    $('#divEmail').removeClass('has-error');
  }
  if($('#txtPassword').val() == ''){
    $('#divPassword').addClass('has-error');
  }
  else{
    $('#divPassword').removeClass('has-error');
  }
  
  if(validationFlag){
      $.ajax({
      url: apiServer+"/login",
      type: 'POST',
      dataType: 'json',
      data: {
        email: $('#txtEmail').val(),
        password: $.sha1($('#txtPassword').val())
      },
      success: function (data) {
        localStorage.setItem("token",data.data.token);
        window.location.href = "/home";
      },
      error: function (data) {
        let errMsg = JSON.parse(data.responseText).error.message;
        $.gritter.add({ title: "Login Failed", text: errMsg });
      }
    });
  }
}

