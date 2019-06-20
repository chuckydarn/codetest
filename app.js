const express = require("express");
const app = express();
var path = require('path');
var cors = require('cors');
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");

// view engine setup
app.use(express.static(path.join(__dirname, 'client/build')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

appConfig.init(app);
routeConfig.init(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
