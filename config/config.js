require("dotenv").config();
const {
  DEV_DB_HOST,
  DEV_DB_NAME,
  DEV_DB_USERNAME,
  DEV_DB_PASSWORD,
  DEV_DB_PORT,
} = process.env;

module.exports = {
  development: {
    username: DEV_DB_USERNAME,
    password: DEV_DB_PASSWORD,
    database: DEV_DB_NAME,
    host: DEV_DB_HOST,
    port: DEV_DB_PORT,
    dialect: "mysql",
  },
};
