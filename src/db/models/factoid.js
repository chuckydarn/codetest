'use strict';
module.exports = (sequelize, DataTypes) => {
  const Factoid = sequelize.define('Factoid', {
    factoid: DataTypes.STRING,
    dogId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Dogs",
        key: "id",
        as: "dogId",
      }
    }
  }, {});
  Factoid.associate = function(models) {
    // associations can be defined here
    Factoid.belongsTo(models.Dog, {
      foreignKey: "dogId",
      onDelete: "CASCADE",
    });
  };
  return Factoid;
};
