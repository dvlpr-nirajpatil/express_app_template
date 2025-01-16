const Token = require("../models/Token");
const logger = require("../utils/logger");
const jwt = require("../utils/jwt");
const response = require("../utils/response");

module.exports.storeToken = async function (uid, refreshToken, accessToken) {
  try {
    const token = await Token.findOne({ uid: uid });

    if (token) {
      token.uid = uid;
      token.accessToken = accessToken;
      token.refreshToken = refreshToken;
      token.save();
      return token;
    } else {
      let newToken = new Token({
        uid: uid,
        refreshToken: refreshToken,
        accessToken: accessToken,
      });
      await newToken.save();
      return newToken;
    }
  } catch (e) {
    logger.error(e);
  }
};

module.exports.refreshToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response(res, 401, "Refresh token is required");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verifyRefreshToken(token);
    if (decoded) {
      const refreshToken = jwt.newResfreshToken(decoded);
      const accessTokenToken = jwt.newAccessToken(decoded);
      this.storeToken(decoded.uid, refreshToken, accessTokenToken);
      return response(res, 200, "New tokens issued", {
        refreshToken,
        accessTokenToken,
      });
    }
  } catch (e) {
    return response(res, 403, "Your session has been expired");
  }
};
