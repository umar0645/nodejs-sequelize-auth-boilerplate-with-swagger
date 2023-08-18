const basicInfo = require("./basicInfo");
const servers = require("./servers");
const paths = require("./paths");

module.exports = {
  ...basicInfo,
  ...servers,
  ...paths,
};
