const { body, param, query } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "signup": {
      return [
        body("name")
          .exists()
          .withMessage("Name is required")
          .trim()
          .escape()
          .notEmpty()
          .isAlpha("en-US", { ignore: " " })
          .withMessage("Name must contain alphabets only")
          .isLength({ min: 3, max: 22 })
          .withMessage("Name must be between 3 and 22 characters"),
        body("password")
          .exists()
          .withMessage("Password is required")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 8 })
          .withMessage("Password must be of min 8 characters"),
        body("username")
          .exists()
          .withMessage("username is required")
          .trim()
          .escape()
          .notEmpty(),
        body("mobile")
          .trim()
          .escape()
          .isNumeric()
          .withMessage("Mobile number must contain numbers only"),
        body("email")
          .exists()
          .withMessage("username is required")
          .trim()
          .escape()
          .notEmpty(),
        body("referralCode", "Referral code is required")
          .exists()
          .trim()
          .escape(),
      ];
    }
    case "signin": {
      return [
        body("password")
          .exists()
          .withMessage("Password is required")
          .trim()
          .escape()
          .notEmpty()
          .isLength({ min: 8 })
          .withMessage("Password must be of min 8 characters"),
        body("email")
          .exists()
          .withMessage("Email is required")
          .trim()
          .escape()
          .notEmpty(),
      ];
    }
    case "verify": {
      return [
        body("code")
          .exists()
          .withMessage("Email is required")
          .trim()
          .escape()
          .notEmpty(),
        body("token")
          .exists()
          .withMessage("Token is required")
          .trim()
          .notEmpty(),
      ];
    }
  }
};
