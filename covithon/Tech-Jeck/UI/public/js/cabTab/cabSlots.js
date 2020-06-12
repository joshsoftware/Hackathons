$(document).ready(function(){
	getCabSlots();
});

function getCabSlots(){
  makeHttpReq("/organization/slots", "GET", null, function (data) {
    if(data.status == 401){
      $.gritter.add({ title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }
    $("#cabSlots").empty();
    let cabSlotsData = "";
    
    _.forEach(data.data, function (cabslot, i) { 
      cabSlotsData += "<tr>";
      cabSlotsData += "<td>" + (i+1) + "</td>";
      cabSlotsData += "<td>" + cabslot.time +"</td>";
      cabSlotsData += " </tr>";            
    });

    $("#cabSlots").append(cabSlotsData);
    
  });
}