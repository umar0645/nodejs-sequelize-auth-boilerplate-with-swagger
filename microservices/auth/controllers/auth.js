const config = require("../../../config/auth.config");
const { password, email } = require("../../../services");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const db = require("../../../models");
const User = db.User;
const Refferal = db.Refferal;
const VerificationToken = db.Verification_tokens;
const moment = require("moment");

module.exports = {
  async signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        status: false,
        type: "errors",
        message: "Error in validation",
        errors: errors.array(),
      });
    }
    // Save User to Database
    const passwordData = await password.hashingPassword(req.body.password);
    User.create({
      name: req.body.name,
      password: passwordData.hash,
      passwordSalt: passwordData.salt,
      username: req.body.username,
      mobile: req.body.mobile,
      email: req.body.email,
    })
      .then((user) => {
        var refCode = req.body.name.replace(/[$,.\s]/g, "") + user.id;
        user
          .update({
            referralCode: refCode,
          })
          .then(async (user) => {
            let JWTVerificationToken = jwt.sign(
              {
                id: user.id,
                name: user.name,
              },
              config.secret,
              { expiresIn: "1h" }
            );
            const code = getRndInteger();
            VerificationToken.create({
              u_id: user.id,
              code: code,
              token: JWTVerificationToken,
            });

            //sending verificaiton email
            await email.sendVerificationEmail(
              user.email,
              code,
              JWTVerificationToken
            );
            //sending verificaiton email

            if (req.body.referralCode != "") {
              Refferal.create({
                u_id_reffered_by: req.body.referralCode,
                u_id_reffered: user.id,
              });
            }

            res.status(200).send({
              id: user.id,
              mobile: user.mobile,
              accessToken: JWTVerificationToken,
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          status: false,
          type: "error",
          message: err.message,
        });
      });
  },

  signin(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        status: false,
        type: "errors",
        message: "Error in validation",
        errors: errors.array(),
      });
    }
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            status: false,
            type: "error",
            message: "Failed! User not found.",
          });
        } else {
          if (user.isActive == false) {
            res.status(402).send({
              status: false,
              type: "error",
              message: "Failed! Account not activated.",
            });
          } else if (user.email == false) {
            VerificationToken.findOne({
              where: {
                u_id: user.id,
              },
            })
              .then(async (verificationToken) => {
                verificationToken.destroy();
                let JWTVerificationToken = jwt.sign(
                  {
                    id: user.id,
                    name: user.name,
                  },
                  config.secret,
                  { expiresIn: "1h" }
                );
                const code = getRndInteger();
                VerificationToken.create({
                  u_id: user.id,
                  code: code,
                  token: jwtTokenMobileVerify,
                });

                //sending verificaiton email
                await email.sendVerificationEmail(
                  user.email,
                  code,
                  JWTVerificationToken
                );
                //sending verificaiton email

                res.status(400).send({
                  status: false,
                  type: "email",
                  id: user.id,
                  fullName: user.fullName,
                  email: user.email,
                  accessToken: JWTVerificationToken,
                });
              })
              .catch((err) => {
                res.status(400).send({
                  status: false,
                  type: "error",
                  message: err.message,
                });
              });
          } else {
            const passwordIsValid = password.unHashingPassword(
              user.password,
              user.passwordSalt,
              req.body.password
            );
            if (!passwordIsValid) {
              res.status(401).send({
                status: false,
                type: "error",
                message: "Failed! Invalid password.",
              });
            } else {
              var token = jwt.sign(
                {
                  id: user.id,
                  name: user.name,
                },
                config.secret,
                {
                  expiresIn: 7890000, // 3 months
                }
              );

              res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken: token,
              });
            }
          }
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  },

  async verify(req, res) {
    try {
      const { otp, token } = req.body; // User will send both OTP and token in the body

      const decoded = jwt.verify(token, config.secret);
      const verificationEntry = await VerificationToken.findOne({
        where: {
          u_id: decoded.user.id,
          code: otp,
          token: token,
        },
      });

      if (!verificationEntry) {
        return res.status(400).send("Invalid OTP or Token");
      }

      const user = await User.findByPk(decoded.userId);
      user.isEmailVerified = true;
      await user.save();

      res.status(200).send("Email verified successfully!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

function getRndInteger() {
  return Math.floor(100000 + Math.random() * 900000);
  // return 123456;
}
