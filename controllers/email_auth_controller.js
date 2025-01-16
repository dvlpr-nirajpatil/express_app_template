const User = require("../models/User");
const response = require("../utils/response");
const passwordManager = require("../utils/password");
const jwt = require("../utils/jwt");
const tokenController = require("./token_controller");
const logger = require("../utils/logger");
const uuid = require("uuid");

module.exports.signIn = async function (req, res) {
  const { email, password } = req.body;
  if (!email) {
    return response(res, 400, "email is required");
  }
  if (!password) {
    return response(res, 400, "password is required");
  }

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return response(res, 400, "Emaild id does not exists");
    }

    const isPassMatched = passwordManager.comparePassword(
      user.password,
      password
    );

    if (!isPassMatched) {
      return response(res, 400, "Invalid credentials");
    }

    let accessToken = jwt.newAccessToken(user);
    let refreshToken = jwt.newResfreshToken(user);
    await tokenController.storeToken(user.uid, refreshToken, accessToken);

    const payload = {
      uid: user.uid,
      email: user.email,
      authType: user.authType,
      accessToken,
      refreshToken,
    };

    return response(res, 200, "User login successfull", payload);
  } catch (e) {
    return response(res, 500, null, null, e);
  }
};

module.exports.signUp = async function (req, res) {
  const { email, password } = req.body;
  if (!email) {
    return response(res, 400, "email is required");
  }
  if (!password) {
    return response(res, 400, "password is required");
  }

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return response(res, 400, "Email already exists");
    }

    let uid = uuid.v4();

    let hashedPass = await passwordManager.hashPassword(password);

    user = new User({
      email: email,
      password: hashedPass,
      uid: uid,
      authType: "email",
    });

    await user.save();

    let accessToken = jwt.newAccessToken(user);
    let refreshToken = jwt.newResfreshToken(user);
    await tokenController.storeToken(user.uid, refreshToken, accessToken);

    return response(res, 200, "New user created successfully", {
      uid,
      email,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    logger.error(e);
    return response(res, 500, null, null, e);
  }
};

module.exports.signOut = async function (req, res) {
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
