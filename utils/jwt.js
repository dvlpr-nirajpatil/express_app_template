const jwt = require("jsonwebtoken");
require("dotenv").config();

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

module.exports.newResfreshToken = (user) => {
  return jwt.sign(user, refreshTokenSecret, { expiresIn: "15d" });
};

module.exports.newAccessToken = (user) => {
  return jwt.sign(user, accessTokenSecret, { expiresIn: "15m" });
};

module.exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshTokenSecret);
};

module.exports.verifyAccessToken = (token) => {
  return jwt.verify(token, accessTokenSecret);
};
