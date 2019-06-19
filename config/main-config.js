require("dotenv").config();
const bodyParser = require("body-parser");

module.exports = {
  init(app){
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  }
};
