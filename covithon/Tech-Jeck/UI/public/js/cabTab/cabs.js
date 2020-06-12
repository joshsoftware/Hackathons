$(document).ready(function(){
	getCabs();
});

function getCabs(){
  makeHttpReq("/organization/cabs", "GET", null, function (data) {
    if(data.status == 401){
      $.gritter.add({ title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }
    $("#cabs").empty();
    let cabsData = "";
    
    _.forEach(data.data, function (cab, i) { 
      cabsData += "<tr>";
      cabsData += "<td>" + (i+1) + "</td>";
      cabsData += "<td>" + cab.registration_number +"</td>";
      cabsData += "<td>" + cab.Org_cab_type.name +"</td>";
      cabsData += " </tr>";            
    });

    $("#cabs").append(cabsData);
    
  });
}