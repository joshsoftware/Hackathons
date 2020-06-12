$(document).ready(function(){
  $.ajaxSetup({
    headers: { "Authorization": "Bearer " + localStorage.token }
  });
});

function makeHttpReq(apiPath, methodType, data, callback) {
  var reqBody = {};

  if (data != undefined && data != '') {
    reqBody = data;
  }
  if (methodType == 'GET') {
    $.ajax({
      type: methodType,
      url: apiServer + apiPath,
      contentType: "application/json",
      datatype: "JSON",
      success: function (data) {
        callback(data);
      },
      error: function (data) {
        callback(data)
        data = "";
      }
    });
  }
  else {
    $.ajax({
      type: methodType,
      url: apiServer + apiPath,
      contentType: "application/json",
      datatype: "JSON",
      data: JSON.stringify(reqBody),
      success: function (data) {
        callback(data);
      },
      error: function (data) {
        callback(data);
      }
    });
  }
}