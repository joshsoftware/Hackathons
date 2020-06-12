const moment = require("moment");
const db = require("../models/index")
const jwtUtils = require("../utils/utils")

module.exports.getProfile = async (req, res) => {
  
  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let userProfile;
  
  await db.Users.findByPk(
    userData.userId, 
    {
      attributes: { exclude: ["pwd", "createdAt","updatedAt"] },
      include: [{ model: db.Organizations, attributes: ['name'] }]
    })
    .then(function (userData) {
      userProfile = userData;
    })
    .catch(() => {
      userProfile = "error"
    });
  
  if (userProfile && userProfile != "error") {
    res.send({
      data: userProfile,
    });
  }
  else{
    res.status(404).send({
      error: {
        message: "User not found"
      },
    });
  }
};

module.exports.getDrivers = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let drivers = [];

  await db.Drivers.findAll(
    {
      where: {
        org_id: userData.orgId
      },
      attributes: { exclude: ["org_id","createdAt", "updatedAt"] }
    })
    .then(function (driverData) {
      drivers = driverData;
    })
    .catch(() => {
      userProfile = "error"
    });

  if (drivers != "error") {
    res.send({
      data: drivers,
    });
  }
  else {
    res.status(404).send({
      error: {
        message: "Drivers not found"
      },
    });
  }
};


module.exports.getUsers = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let users = [];

  await db.Users.findAll(
    {
      where: {
        org_id: userData.orgId,
        role: "EMPLOYEE"
      },
      attributes: { exclude: ["pwd", "createdAt", "updatedAt"] }
    })
    .then(function (usersList) {
      users = usersList;
    })
    .catch(() => {
      users = "error"
    });

  if (users != "error") {
    res.send({
      data: users,
    });
  }
  else {
    res.status(404).send({
      error: {
        message: "Users not found"
      },
    });
  }
};