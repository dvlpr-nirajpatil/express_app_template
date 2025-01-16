const User = require("../models/User");
const tokenController = require("../controllers/token_controller");
const jwt = require("../utils/jwt");
const logger = require("../utils/logger");
const response = require("../utils/response");
const uuid = require("uuid");

module.exports.signInWithGoogle = async function (req, res) {
  const { email, googleId, profilePic } = req.body;

  if (!email || !googleId) {
    return response(res, 400, "email and googleid are required");
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      let uid = uuid.v4();

      const newUser = new User({
        uid: uid,
        email: email,
        google_id: googleId,
        profilePicture: profilePic,
        authType: "google",
      });

      const accessToken = jwt.newAccessToken(newUser);
      const refreshToken = jwt.newResfreshToken(newUser);
      await tokenController.storeToken(uid, refreshToken, accessToken);
      newUser.save();

      var payload = {
        uid: newUser.uid,
        email: newUser.email,
        refreshToken,
        accessToken,
      };
      return response(res, 201, "New user created successfull !", payload);
    } else {
      if (!user.google_id) {
        user.authType = "google";
        user.google_id = googleId;
        user.save();
      }
      const accessToken = jwt.newAccessToken(user);
      const refreshToken = jwt.newResfreshToken(user);
      await tokenController.storeToken(user.uid, refreshToken, accessToken);
      var payload = {
        uid: user.uid,
        email: user.email,
        refreshToken,
        accessToken,
      };
      return response(res, 200, "User signin successfull !", payload);
    }
  } catch (e) {
    return response(res, 500, null, null, e);
  }
};

module.exports.signInWithApple = async function (req, res) {
  const { email, appleId, profilePic } = req.body;

  if (!email || !appleId) {
    return response(res, 400, "email and googleid are required");
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      let uid = uuid.v4();

      const newUser = new User({
        uid: uid,
        email: email,
        google_id: appleId,
        profilePicture: profilePic,
        authType: "apple",
      });

      const accessToken = jwt.newAccessToken(newUser);
      const refreshToken = jwt.newResfreshToken(newUser);
      await tokenController.storeToken(uid, refreshToken, accessToken);
      newUser.save();

      var payload = {
        uid: newUser.uid,
        email: newUser.email,
        refreshToken,
        accessToken,
      };
      return response(res, 201, "New user created successfull !", payload);
    } else {
      if (!user.apple_id) {
        user.authType = "apple";
        user.apple_id = appleId;
        user.save();
      }

      const accessToken = jwt.newAccessToken(user);
      const refreshToken = jwt.newResfreshToken(user);
      await tokenController.storeToken(user.uid, refreshToken, accessToken);
      var payload = {
        uid: user.uid,
        email: user.email,
        refreshToken,
        accessToken,
      };
      return response(res, 200, "User signin successfull !", payload);
    }
  } catch (e) {
    return response(res, 500, null, null, e);
  }
};
