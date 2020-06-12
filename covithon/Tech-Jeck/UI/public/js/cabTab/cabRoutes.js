$(document).ready(function(){
	getCabRoutes();
});

function getCabRoutes(){
  makeHttpReq("/organization/routes", "GET", null, function (data) {
    if(data.status == 401){
      $.gritter.add({ title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }
    $("#cabRoutes").empty();
    let cabRoutesData = "";
    
    _.forEach(data.data, function (cabroute, i) { 
      cabRoutesData += "<tr>";
      cabRoutesData += "<td>" + (i+1) + "</td>";
      cabRoutesData += "<td>" + cabroute.route +"</td>";
      cabRoutesData += " </tr>";            
    });

    $("#cabRoutes").append(cabRoutesData);
    
  });
}