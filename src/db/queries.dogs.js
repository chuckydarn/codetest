const Dog = require("./models").Dog;

module.exports = {
  getAllDogs(callback){
    return Dog.all()
    .then((dogs) => {
      callback(null, dogs);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
