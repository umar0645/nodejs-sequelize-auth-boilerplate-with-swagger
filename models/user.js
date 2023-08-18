"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      signupMethod: DataTypes.STRING,
      avatar: DataTypes.TEXT,
      userType: DataTypes.STRING,
      roleID: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      passwordSalt: DataTypes.TEXT,
      mobile: DataTypes.STRING,
      selectedLanguage: DataTypes.STRING,
      referralCode: DataTypes.STRING,
      lastActive: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      isPhoneVerified: DataTypes.BOOLEAN,
      isEmailVerified: DataTypes.BOOLEAN,
      isActive: DataTypes.BOOLEAN,
      isTrash: DataTypes.BOOLEAN,
      otherInfo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
