const db = require("../models");
const User = db.User;

ifReferralExist = (req, res, next) => {
    if (req.body.referralCode != "") {
        User.findOne({
            where: {
                referralCode: req.body.referralCode
            }
        }).then(user => {
            if (!user) {
                res.status(400).send({
                    status: false,
                    type: "error",
                    message: "Failed! Referral code is incorrect!"
                });
                return;
            }
            req.referral = user.id;

            next();
        });
    } else {
        req.referral = null;

        next();
    }
};

const referral = {
    ifReferralExist: ifReferralExist
};

module.exports = referral;