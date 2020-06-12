const express = require("express");
const bodyParser = require("body-parser");
const rideController = require("../controllers/rideController");
const slotController = require("../controllers/slotsController");
const routeController = require("../controllers/routesController");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/rides/upcoming", async (req, res) => {
  rideController.getUpComingRides(req, res);
});

router.post("/rides/schedule", async (req, res) => {
  rideController.scheduleRides(req, res);
});

router.put("/rides/:rideId/cancel", async (req, res) => {
  rideController.cancelRide(req, res);
});

router.get("/rides/slots", async (req, res) => {
  slotController.getSlots(req, res);
});

router.get("/rides/routes", async (req, res) => {
  routeController.getRoutes(req, res);
});

router.get("/slots/schedule", async (req, res) => {
  slotController.getSlotsSchedule(req, res);
});

module.exports = router;
