require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../models");
const TeamUser = db.TeamUser;

hasRole = (roles) => {
    return (req, res, next) => {
        // verify token
        try {
            let token = req.headers["x-access-token"];
            if (!token) {
                return res.status(403).send({
                    message: "No token provided!",
                });
            }

            const secret = process.env.ADMIN_JWT_SECRET;
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        message: "Unauthorized!",
                    });
                }
                req.userId = decoded.id;

                // Checking if user has required role
                const rolesArray = roles.split("|");
                TeamUser.findOne({
                    where: {
                        id: req.userId
                    }
                }).then((teamUser) => {
                    if (teamUser && rolesArray.includes(teamUser.role)) {
                        next();
                    } else {
                        res.status(403).send({
                            message: `One of the roles ${roles} is required.`,
                        });
                    }
                });
            });


        } catch (err) {
            res.status(500).send({
                message: err.message,
            });
        }
    };
};

const roles = {
    hasRole: hasRole,
};
module.exports = roles;
