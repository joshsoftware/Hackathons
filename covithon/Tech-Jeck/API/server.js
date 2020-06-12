const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config("./.env");

const indexRoute = require("./routes/index");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", cors(), indexRoute);

const httpServer = http.createServer(app);

httpServer.listen(process.env.HTTP_PORT || 8080);
console.log("Server running on : " +process.env.HTTP_PORT || 8080);
