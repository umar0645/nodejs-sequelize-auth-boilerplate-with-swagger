'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Verification_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Verification_tokens.belongsTo(models.User, { 
        foreignKey: "u_id",
        as: "user" 
      });
    }
  };

  Verification_tokens.init({
    u_id: DataTypes.INTEGER,
    code: DataTypes.STRING,
    token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Verification_tokens',
  });
  return Verification_tokens;
};