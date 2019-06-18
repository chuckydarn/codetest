const dogQueries = require("../src/db/queries.dogs.js");

module.exports = {
  index(req, res, next){
    dogQueries.getAllDogs((err, dogs) => {
      if(err){
        res.send('error');
      } else {
        res.send({dogs});
      }
    })
  }
}
