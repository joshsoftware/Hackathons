const express = require("express");
const bodyParser = require("body-parser");
const userController = require("../controllers/userController");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/profile", async (req, res) => {
  userController.getProfile(req, res);
});

router.get("/drivers", async (req, res) => {
  userController.getDrivers(req, res);
});

router.get("/users", async (req, res) => {
  userController.getUsers(req, res);
});

module.exports = router;
