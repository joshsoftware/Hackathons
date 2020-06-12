const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();

const utils = require("../utils/utils");
const sessionRoute = require("./sessionRoutes");
const userRoute = require("./userRoutes");
const rideRoute = require("./rideRoutes");
const orgRoute = require("./orgRoutes");

routes.use(bodyParser.urlencoded({ extended: true }));

routes.use("/", sessionRoute);

routes.use(utils.authenticateToken);

routes.use("/", userRoute);
routes.use("/", rideRoute);
routes.use("/", orgRoute);

module.exports = routes;
