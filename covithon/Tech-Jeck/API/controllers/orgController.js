const Sequelize = require('sequelize');
const db = require("../models/index")
const jwtUtils = require("../utils/utils")

module.exports.getCabs = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let cabs = [];

  await db.Org_cabs.findAll(
    {
      where: {
        org_id: userData.orgId
      },
      attributes: ["registration_number"],
      include: { 
        model: db.Org_cab_types,
        require:true,
        attributes: ['name'] 
      }
    })
    .then(function (cabsData) {
      cabs = cabsData;
    })
    .catch(() => {
      cabs = "error"
    });

  if (cabs && cabs != "error") {
    res.send({
      data: cabs,
    });
  }
  else {
    res.status(404).send({
      error: {
        message: "Cabs not found"
      },
    });
  }
};

module.exports.getRoutes = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let routes = [];

  await db.Org_routes.findAll(
    {
      where: {
        org_id: userData.orgId
      },
      attributes: ["id", "route"] 
    })
    .then(function (routeData) {
      routes = routeData;
    })
    .catch(() => {
      routes = "error"
    });

  if (routes != "error") {
    res.send({
      data: routes,
    });
  }
  else {
    res.status(404).send({
      error: {
        message: "Routes not found"
      },
    });
  }
};

module.exports.getSlots = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let slots = [];

  await db.Org_slots.findAll(
    {
      where: {
        org_id: userData.orgId
      },
      attributes: ["id", "time"]
    })
    .then(function (slotData) {
      slots = slotData;
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
    res.status(404).send({
      error: {
        message: "Slots not found"
      },
    });
  }
};

module.exports.getCabTypes = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let cabTypes = [];

  await db.Org_cab_types.findAll(
    {
      where: {
        org_id: userData.orgId
      },
      attributes: ["id", "name", "passengers_capacity","min_onboard_count"]
    })
    .then(function (cabTypeData) {
      cabTypes = cabTypeData;
    })
    .catch(() => {
      cabTypes = "error"
    });

  if (cabTypes != "error") {
    res.send({
      data: cabTypes,
    });
  }
  else {
    res.status(404).send({
      error: {
        message: "Cab types not found"
      },
    });
  }
};

module.exports.getOrgs = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let orgs = [];

  await db.Organizations.findAll(
    {
      where: { 
        id: {
          [Sequelize.Op.ne]: userData.orgId
        } 
      },
      attributes: { exclude: ["createdAt", "updatedAt"] }
    })
    .then(function (orgData) {
      orgs = orgData;
    })
    .catch(() => {
      orgs = "error"
    });

  if (orgs != "error") {
    res.send({
      data: orgs,
    });
  }
  else {
    res.status(404).send({
      error: {
        message: "Organizations not found"
      },
    });
  }
};