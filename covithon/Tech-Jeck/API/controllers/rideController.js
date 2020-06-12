const moment = require("moment");
require('moment/locale/cs');

const db = require("../models/index")
const jwtUtils = require("../utils/utils")

module.exports.getUpComingRides = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let rides = [];

  await db.User_rides.findAll(
    {
      where: { user_id:userData.userId, status:"Upcoming"},
      attributes: [ "id","scheduled_on"],
      include: { 
        model: db.Slots_cabs_routes, 
        attributes: ['id'],
        include: [
          {
            model: db.Org_slots,
            attributes:["time"],
          }, 
          {
            model: db.Drivers,
            attributes: ["first_name","last_name","contact_number"]
          },
          {
            model: db.Org_cabs,
            attributes: ["registration_number"]
          },
          {
            model: db.Org_routes,
            attributes: ["route"]
          }
        ] 
      },
      order: [
        ['scheduled_on', 'ASC']
      ]
    })
    .then(function (ridesData) {
      rides = ridesData;
    })
    .catch(() => {
      rides = "error"
    });

  if (rides != "error") {
    res.send({
      data: rides,
    });
  }
  else {
    res.status(422).send({
      error: {
        message: "No data available"
      },
    });
  }
};

module.exports.scheduleRides = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let rides = [];
  let slot, cabRoute, scheduledSlot;

  await db.Org_slots.findOne(
    {
      where:{id:req.body.slotId,org_id:userData.orgId},
      attributes: ["id"] ,
    })
    .then(function (slotData) {
      slot = slotData;
    })
    .catch(() => {
      slot = "error"
    });
  
  if (!slot || slot === "error"){
    res.status(404).send({
      error: {
        message: "Invalid slot"
      },
    });
    return;
  }
  
  await db.Org_routes.findOne(
    {
      where: { id: req.body.routeId, org_id: userData.orgId },
      attributes: ["id"],
    })
    .then(function (routeData) {
      cabRoute = routeData;
    })
    .catch(() => {
      cabRoute = "error"
    });
    
  if (!cabRoute || cabRoute === "error") {
    res.status(404).send({
      error: {
        message: "Invalid route"
      },
    });
    return;
  }
  
  await db.Slots_cabs_routes.findOne(
    {
      where: { slot_id: slot.id, route_id: cabRoute.id },
      attributes: ["id"],
    })
    .then(function (slotData) {
      scheduledSlot = slotData;
    })
    .catch(() => {
      scheduledSlot = "error"
    });
   
  if (!scheduledSlot || scheduledSlot === "error") {
    res.status(422).send({
      error: {
        message: "No cabs allocated for this slot"
      },
    });
    return;
  }

  let currentDate = new Date();
  let currentDay = moment().get('day');
  let daysToSchedule = 5;

  if(currentDay == 0 || currentDay == 5){ //if current day is sunday or friday, schedule for next week
    for (let i = 0; i < daysToSchedule;i++){
      rides.push(
        {
          slots_cabs_routes_id: scheduledSlot.id,
          user_id: userData.userId,
          scheduled_on: moment().add(1, 'weeks').startOf('isoWeek').add(i, 'day'),
          status: "Upcoming",
          createdAt: currentDate,
          updatedAt: currentDate
        }
      );
    }
  }
  else{
    let dateCounter = 1;
    for (let i = currentDay; i < daysToSchedule;i++){
      rides.push(
        {
          slots_cabs_routes_id: scheduledSlot.id,
          user_id: userData.userId,
          scheduled_on: moment().add(dateCounter, 'day'),
          status: "Upcoming",
          createdAt: currentDate,
          updatedAt: currentDate
        }
      );
      dateCounter++;
    }
  }
  

  let result;
  await db.User_rides.bulkCreate(rides).then(
    function (ridesData) {
      result = ridesData;
    })
    .catch(() => {
      result = "error"
    });
  
  if (result != "error") {
    res.send({
      data: rides,
    });
  }
  else {
    res.status(422).send({
      error: {
        message: "Unable to schedule rides"
      },
    });
  }

};

module.exports.cancelRide = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let rides = [];

  await db.User_rides.update(
    {
      status: "Cancelled"
    },
    {
      where: { user_id: userData.userId, status: "Upcoming", id: req.params.rideId }
    })
    .then(function (ridesData) {
      rides = ridesData;
    })
    .catch(() => {
      rides = "error"
    });

  if (rides != "error" && rides[0] != 0) {
    res.send({
      data: rides,
    });
  }
  else {
    res.status(422).send({
      error: {
        message: "Invalid ride selection"
      },
    });
  }
};
