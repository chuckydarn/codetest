const Factoid = require("./models").Factoid;

module.exports = {
  getAllFactoids(callback){
    return Factoid.all()
    .then((factoids) => {
      callback(null, factoids);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addFactoid(newFactoid, callback) {
    return Factoid.create({
      factoid: newFactoid.factoid,
      dogId: newFactoid.dogId
    })
    .then((factoid) => {
      callback(null, factoid);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteFactoid(id, callback){
    return Factoid.destroy({
      where: {id}
    })
    .then((factoid) => {
      callback(null, factoid);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
