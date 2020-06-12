$(document).ready(function(){
	getCabTypes();
});

function getCabTypes(){
  makeHttpReq("/organization/cabTypes", "GET", null, function (data) {
    if(data.status == 401){
      $.gritter.add({ title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }
    $("#cabTypes").empty();
    let cabTypeData = "";
    
    _.forEach(data.data, function (cabtype, i) { 
      cabTypeData += "<tr>";
      cabTypeData += "<td>" + (i+1) + "</td>";
      cabTypeData += "<td>" + cabtype.name +"</td>";
      cabTypeData += "<td>" + cabtype.passengers_capacity + "</td>";
      cabTypeData += "<td>" + cabtype.min_onboard_count + "</td>";
      cabTypeData += " </tr>";            
    });

    $("#cabTypes").append(cabTypeData);
    
  });
}