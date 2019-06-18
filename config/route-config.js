module.exports = {
  init(app){
    const dogRoutes = require("../routes/dogs");

    app.use(dogRoutes);
  }
}
