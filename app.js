const express = require("express");
const app = express();
var cors = require('cors');
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");

app.use(cors());

appConfig.init(app);
routeConfig.init(app);

module.exports = app;
