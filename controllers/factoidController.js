const factoidQueries = require("../src/db/queries.factoids.js");

module.exports = {
  index(req, res, next){
    factoidQueries.getAllFactoids((err, factoids) => {
      if(err){
        res.send('error');
      } else {
        res.send({factoids});
      }
    })
  },

  create(req, res, next) {
    let newFactoid = {
      factoid: req.body.factoid,
      dogId: req.body.dogId
    };
    factoidQueries.addFactoid(newFactoid, (err, factoid) => {
      if(err){
        res.send('error');
      } else {
        res.send({factoid});
      }
    });
  },

  destroy(req, res, next){
    factoidQueries.deleteFactoid(req.params.id, (err, factoid) => {
      if(err){
        res.send('error');
      } else {
        res.send(req.params.id);
      }
    });
  }
}
