const express = require("express");
const bodyParser = require("body-parser");
const orgController = require("../controllers/orgController");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/organizations", async (req, res) => {
  orgController.getOrgs(req, res);
});

router.get("/organization/cabs", async (req, res) => {
  orgController.getCabs(req, res);
});

router.get("/organization/routes", async (req, res) => {
  orgController.getRoutes(req, res);
});

router.get("/organization/slots", async (req, res) => {
  orgController.getSlots(req, res);
});

router.get("/organization/cabTypes", async (req, res) => {
  orgController.getCabTypes(req, res);
});


module.exports = router;
