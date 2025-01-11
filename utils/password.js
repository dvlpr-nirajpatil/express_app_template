const bcrypt = require("bcrypt");

module.exports.hashPassword = async function (password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

module.exports.comparePassword = async function (password, hashedPass) {
  const matched = await bcrypt.compare(password, hashedPass);
  return matched;
};
