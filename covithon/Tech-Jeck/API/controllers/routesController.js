const moment = require("moment");

const db = require("../models/index")
const jwtUtils = require("../utils/utils")

module.exports.getRoutes = async (req, res) => {

  let userData = jwtUtils.decodeToken(req.headers["authorization"]);
  let routes = [];

  await db.Org_routes.findAll(
    {
      where: { org_id: userData.orgId },
      attributes: ["id", "route"]
    })
    .then(function (routesData) {
      routes = routesData;
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
    res.status(422).send({
      error: {
        message: "No data available"
      },
    });
  }
};