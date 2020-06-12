const moment = require("moment");

const db = require("../models/index")
const jwtUtils = require("../utils/utils")

module.exports.getSlots = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let slots = [];

  await db.Org_slots.findAll(
    {
      where: { org_id: userData.orgId },
      attributes: ["id","time"]
    })
    .then(function (slotsData) {
      slots = slotsData;
    })
    .catch(() => {
      slots = "error"
    });

  if (slots != "error") {
    res.send({
      data: slots,
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

module.exports.getSlotsSchedule = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let slots = [];

  await db.Slots_cabs_routes.findAll(
    {
      attributes: ["id"],
      include: [
        {
          model: db.Org_slots,
          required:true,
          attributes: ["time"],
          include:{
            model: db.Organizations,
            required:true,
            attributes:["id"],
            where: {
              id: userData.orgId
            }
          }
        },
        {
          model: db.Drivers,
          attributes: ["first_name", "last_name", "contact_number"]
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
    })
    .then(function (slotsData) {
      slots = slotsData;
    })
    .catch(() => {
      slots = "error"
    });

  if (slots != "error") {
    res.send({
      data: slots,
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