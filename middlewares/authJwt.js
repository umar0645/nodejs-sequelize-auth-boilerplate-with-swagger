const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  // console.log("token", token);
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    req.userName = decoded.name;
    next();
  });
};

isUserActive = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user.isActive && !user.isTrash) {
      next();
      return;
    }
    res.status(410).send({
      message: "Account is not active.",
    });
    return;
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    if (user.userRole === "Admin") {
      next();
      return;
    }
    res.status(403).send({
      message: "Admin role required.",
    });
    return;
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isUserActive: isUserActive,
  isAdmin: isAdmin,
};
module.exports = authJwt;
