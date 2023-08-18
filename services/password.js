const crypto = require("crypto");

module.exports = {
  hashingPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return { hash: hash, salt: salt };
  },
  unHashingPassword(password, salt, userHash) {
    const hash = crypto
      .pbkdf2Sync(userHash, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    return password === hash;
  },
};
