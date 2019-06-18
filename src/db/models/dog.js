'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define('Dog', {
    name: DataTypes.STRING
  }, {});
  Dog.associate = function(models) {
    // associations can be defined here
    Dog.hasMany(models.Factoid, {
      foreignKey: "dogId",
      as: "factoids",
    });
  };
  return Dog;
};
