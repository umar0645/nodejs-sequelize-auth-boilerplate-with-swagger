'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Refferal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Refferal.belongsTo(models.User, { 
        foreignKey: "u_id_reffered_by",
        as: "reffered_by" 
      });
      Refferal.belongsTo(models.User, { 
        foreignKey: "u_id_reffered",
        as: "reffered" 
      });
    }
  };
  Refferal.init({
    u_id_reffered_by: DataTypes.INTEGER,
    u_id_reffered: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Refferal',
  });
  return Refferal;
};