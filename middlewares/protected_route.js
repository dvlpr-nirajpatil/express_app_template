const jwt = require("../utils/jwt");
const logger = require("../utils/logger");
const response = require("../utils/response");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response(res, 401, "Access token is required");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verifyAccessToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (error) {
    return response(res, 403, "Access token is expired");
  }
};

module.exports = protect;
