"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.TEXT,
      },
      userType: {
        type: Sequelize.STRING,
        defaultValue: "User",
      },
      username: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      signupMethod: {
        type: Sequelize.STRING,
        defaultValue: "Email",
      },
      roleID: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      password: {
        type: Sequelize.TEXT,
      },
      passwordSalt: {
        type: Sequelize.TEXT,
      },
      mobile: {
        type: Sequelize.STRING,
      },
      selectedLanguage: {
        type: Sequelize.STRING,
        defaultValue: "English",
      },
      referralCode: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      lastActive: {
        type: Sequelize.STRING,
      },
      isPhoneVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      city: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      isTrash: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      otherInfo: {
        type: Sequelize.TEXT,
        defaultValue: "",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
