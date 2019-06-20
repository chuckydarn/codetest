const express = require("express");
const app = express();
var path = require('path');
var cors = require('cors');
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");

app.use(cors());

appConfig.init(app);
routeConfig.init(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;
