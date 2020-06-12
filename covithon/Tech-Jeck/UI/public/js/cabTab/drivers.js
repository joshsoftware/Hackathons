$(document).ready(function(){
	getDrivers();
});

function getDrivers(){
  makeHttpReq("/drivers", "GET", null, function (data) {
    if(data.status == 401){
      $.gritter.add({ title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }
    $("#drivers").empty();
    let driversData = "";
    
    _.forEach(data.data, function (cabschedule, i) { 
      driversData += "<tr>";
      driversData += "<td>" + cabschedule.first_name + " " + cabschedule.last_name+"</td>";
      driversData += "<td>"+ cabschedule.contact_number+"</td>";
      driversData += " </tr>";            
    });

    $("#drivers").append(driversData);
    
  });
}