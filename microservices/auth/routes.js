const controllers = require("./controllers");
const config = require("../../config/auth.config");
const auth = controllers.auth;
// Middlewares
const { verifySignUp, referral, authJwt } = require("../../middlewares");
const validations = require("../../validations");

const pre_path = `/api/v1/users`;

/******** Social Login functionality */
/******** Social Login functionality */

module.exports = (app) => {
  app.get(`${pre_path}`, (req, res) => {
    return res.status(200).json({ msg: "Hello form users" });
  });

  app.post(
    `${pre_path}/auth/signup`,
    [
      verifySignUp.checkDuplicateMobile,
      referral.ifReferralExist,
      validations.validate("signup"),
    ],
    auth.signup
  );
  app.post(
    `${pre_path}/auth/signin`,
    [validations.validate("signin")],
    auth.signin
  );
  app.post(
    `${pre_path}/auth/verify`,
    [validations.validate("verify")],
    auth.verify
  );
};
