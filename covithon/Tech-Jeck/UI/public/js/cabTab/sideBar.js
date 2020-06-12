const orgAdminMenu =
{
  cabsMenu: {
    name: "Cabs",
    shortName: "Cabs",
    description: "Manage Cabs",
    version: "1.0",
    icon: "fa-car",
    url: "cabs"
  },
  routesMenu: {
    name: "Cab Routes",
    shortName: "Routes",
    description: "Manage Routes",
    version: "1.0",
    icon: "fa-map-marker",
    url: "cabRoutes"
  },
  slotsMenu: {
    name: "Cab Slots",
    shortName: "Slots",
    description: "Manage Slots",
    version: "1.0",
    icon: "fa-clock-o",
    url: "cabSlots"
  },
  cabScheduleMenu: {
    name: "Cabs Schedule",
    shortName: "cabSchedule",
    description: "Cab Schedule",
    version: "1.0",
    icon: "fa-calendar-o",
    url: "cabSchedule"
  },
  CabTypesMenu: {
    name: "Cab Types",
    shortName: "cabTypes",
    description: "Manage Cab Types",
    version: "1.0",
    icon: "fa-car",
    url: "cabtypes"
  },
  driversMenu: {
    name: "Drivers",
    shortName: "Drivers",
    description: "Manage Drivers",
    version: "1.0",
    icon: "fa-user",
    url: "drivers"
  },
  scheduleRidesMenu: {
    name: "Schedule Rides",
    shortName: "scheduleRides",
    description: "schedule Rides",
    version: "1.0",
    icon: "fa-location-arrow",
    url: "upcomingRides"
  },
  userMenu: {
    name: "Users",
    shortName: "Users",
    description: "Manage Users",
    version: "1.0",
    url: "users",
    icon: "fa-user",
    features: {}
  }
};

const superAdminMenu =
{
  orgMenu: {
    name: "Organizations",
    shortName: "Organizations",
    description: "Manage Organizations",
    version: "1.0",
    icon: "fa-user",
    url: "organizations"
  }
}

const usersMenu =
{
  cabScheduleMenu: {
    name: "Cabs Schedule",
    shortName: "cabSchedule",
    description: "Cab Schedule",
    version: "1.0",
    icon: "fa-calendar-o",
    url: "cabSchedule"
  },
  driversMenu: {
    name: "Drivers",
    shortName: "Drivers",
    description: "Manage Drivers",
    version: "1.0",
    icon: "fa-user",
    url: "drivers"
  },
  scheduleRidesMenu: {
    name: "Schedule Rides",
    shortName: "scheduleRides",
    description: "schedule Rides",
    version: "1.0",
    icon: "fa-location-arrow",
    url: "upcomingRides"
  }
};



$(document).ready(function () {
  generateMenus();
  getUserProfile();
  
  $('.logout').on('click', function(){
    localStorage.clear();
    window.location.href = "/";
  })


});

function generateMenus(){
  let menuContents = '';
  let userRole = JSON.parse(atob(localStorage.token.split('.')[1])).role;
  $("#mnuList").empty();
  let mnuData = '';

  switch (userRole) {
    case 'ORG_ADMIN':
      mnuData = orgAdminMenu;
      break;
    case 'SUPER_ADMIN':
      mnuData = superAdminMenu;
      break;
    case 'EMPLOYEE':
      mnuData = usersMenu;
      $(".addNew").hide();
      break;

    default:
      return false;
  }

  var menuKeys = Object.keys(mnuData);

  for (let i = 0; i < menuKeys.length; i++) {
    menuContents += '<li><a title="' + mnuData[menuKeys[i]]['description'] + '" href=' + mnuData[menuKeys[i]]['url'] + '><i class="fa ' + mnuData[menuKeys[i]]['icon'] + '"></i><span>' + mnuData[menuKeys[i]]['name'] + '</span></a>';
    menuContents += '</li>';
  }

  $("#mnuList").append(menuContents).trigger('create');;

  $('li').removeClass('active');
  $('a[href=' + window.location.pathname.split('/')[1] + ']').parent().addClass('active');
  $('a[href=' + window.location.pathname.split('/')[1] + ']').parents().eq(2).addClass('active');

}
function getUserProfile() {
  makeHttpReq("/profile", "GET", null, function (data) {
    if (data.status == 401) {
      $.gritter.add({ title: "Unauthorised", text: "Session expired" });
      window.location.href = "/";
    }
    $('.userName').text(data.data.first_name);
    $('.role').text(data.data.role);
    console.log(data.data);
  });
}