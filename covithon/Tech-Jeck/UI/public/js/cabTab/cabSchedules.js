$(document).ready(function(){
	getCabSchedule();
});

function getCabSchedule(){
  makeHttpReq("/slots/schedule", "GET", null, function (data) {
    if(data.status == 401){
      $.gritter.add({ title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }
    $("#cabSchedules").empty();
    let cabScheduleData = "";
    
    _.forEach(data.data, function (cabschedule, i) { 
      cabScheduleData += "<tr>";
      cabScheduleData += "<td>" + cabschedule.Org_slot.time+"</td>";
      cabScheduleData += "<td>" + cabschedule.Org_route.route+"</td>";
      cabScheduleData += "<td>" + cabschedule.Driver.first_name + " " + cabschedule.Driver.last_name+"</td>";
      cabScheduleData += "<td>"+ cabschedule.Org_cab.registration_number+"</td>";
      // cabScheduleData += "<td class='addNew'><span class='fa fa-remove'></span></td>";
      cabScheduleData += " </tr>";            
    });

    $("#cabSchedules").append(cabScheduleData);
    
  });
}