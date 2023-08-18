// auth
const signin = require("./auth/signin");
const signup = require("./auth/signup");

module.exports = {
  paths: {
    "/api/v1/users/auth/signin": {
      ...signin,
    },
    "/api/v1/users/auth/signup": {
      ...signup,
    },
  },
};
