module.exports = {
  init(app){
    const dogRoutes = require("../routes/dogs");
    const factoidRoutes = require("../routes/factoids");

    app.use(dogRoutes);
    app.use(factoidRoutes);
  }
}
