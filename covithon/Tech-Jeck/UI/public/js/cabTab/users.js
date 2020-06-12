$(document).ready(function(){
	getUsers();
});

function getUsers(){
  makeHttpReq("/users", "GET", null, function (data) {
    if(data.status == 401){
      $.gritter.add({ title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }
    $("#users").empty();
    let userData = "";
    
    _.forEach(data.data, function (user, i) { 
      userData += "<tr>";
      userData += "<td>" + user.emp_id + "</td>";
      userData += "<td>" + user.first_name +"</td>";
      userData += "<td>" + user.last_name + "</td>";
      userData += "<td>" + user.contact_number + "</td>";
      userData += "<td>" + user.email + "</td>";
      userData += "<td>" + user.location + "</td>";
      userData += "<td>" + user.credit_points  + "</td>"; 
      userData += " </tr>";            
    });

    $("#users").append(userData);
    
  });
}