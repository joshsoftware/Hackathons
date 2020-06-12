const express = require("express");
const bodyParser = require("body-parser");
const loginController = require("../controllers/loginController");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/ping", async (req, res) => {
  loginController.ping(req,res);
});

router.post("/login", async (req, res) => {
  loginController.login(req,res);
});

module.exports = router;
