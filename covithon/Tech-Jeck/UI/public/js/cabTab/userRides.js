$(document).ready(function(){
  getUserRides();
  $('#btnNewRides').click(function(){
    getcabSlots();
    getcabRoutes();
  })
  $('#btnSchedule').click(function(){
    postScheduleRide();
  });

  $(document).on('click','.cancelRide',function(){
    cancelRide($(this).attr('ride-id'));
  })
});

function getUserRides(){
  makeHttpReq("/rides/upcoming", "GET", null, function (data) {
    if(data.status == 401){
      $.gritter.add({ title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }
    $("#userRidesBody").empty();
    let ridesData = "";
    
    _.forEach(data.data, function (ride, i) { 
      ridesData += "<tr>";
      ridesData += "<td>" + moment(ride.scheduled_on).format("DD-MM-YYYY") + " " + ride.Slots_cabs_route.Org_slot.time+"</td>";
      ridesData += "<td>" + ride.Slots_cabs_route.Org_route.route+"</td>"
      ridesData += "<td>"+ride.Slots_cabs_route.Org_cab.registration_number+"</td>";
      ridesData += "<td>" + ride.Slots_cabs_route.Driver.first_name + " " + ride.Slots_cabs_route.Driver.last_name+"</td>";
      ridesData += "<td><span style='cursor:pointer' class='fa fa-large fa-remove cancelRide' ride-id=" + ride.id  +" ></span></td>";
      ridesData += " </tr>";            
    });

    $("#userRidesBody").append(ridesData);
    
  });
}

function getcabSlots(){
  makeHttpReq("/rides/slots", "GET", null, function(data){
    if(data.status == 401){
      $.gritter.add({ title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }

    $('#cabSlots').find('option').not(':first').remove();
    $.each(data.data,function(slots,data){
      $('#cabSlots').append('<option value="'+data['id']+'">'+data['time']+'</option>');
    });
  });
}

function getcabRoutes(){
  makeHttpReq("/rides/routes", "GET", null, function(data){
    if(data.status == 401){
      $.gritter.add({ title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }

    $('#cabRoutes').find('option').not(':first').remove();
    $.each(data.data,function(slots,data){
      $('#cabRoutes').append('<option value="'+data['id']+'">'+data['route']+'</option>');
    });
  });
}

function postScheduleRide(){
  let data = {
    "slotId":$('#cabSlots').val(),
    "routeId": $('#cabRoutes').val(),
  }
  makeHttpReq("/rides/schedule", "POST", data, function(data){
    if(data.status == 401){
      $.gritter.add({ time: 3000, title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }
    else if(data.status == 422){
      let errMsg = JSON.parse(data.responseText).error.message;
      $.gritter.add({ time: 3000, title: "Failed To Schedule Ride", text: errMsg });
    }
    else if( data.data.length > 0)
    {
      $.gritter.add({ time: 3000, title: "Sucess", text: "Ride Scheduled For a Week Sucessfully"});
      $('#modal-dialog').modal('hide');
      getUserRides();
    }
  });
}

function cancelRide(rideId) {
  makeHttpReq("/rides/" + rideId + "/cancel", "PUT", null, function (data) {
    if (data.status == 401) {
      $.gritter.add({ time: 3000, title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }
    else if (data.status == 422) {
      let errMsg = JSON.parse(data.responseText).error.message;
      $.gritter.add({ time: 3000, title: "Failed To Cancel Ride", text: errMsg });
    }
    else if (data.data[0] == 1) {
      $.gritter.add({ time: 3000, title: "Sucess", text: "Ride Cancelled" });
      getUserRides();
    }
  });
}