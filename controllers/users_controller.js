const User = require("../models/user");
const response = require("../utils/response");
const logger = require("../utils/logger");

exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      response(res, 409, "email address already exists");
    } else {
      let user = new User({
        name: name,
        email: email,
        password: password,
      });

      user.save({ _id: 0, password: 0 });
      response(res, 201, "new user created", user);
    }
  } catch (e) {
    logger.error(e);

    response(res, 401, null, null, e);
    res.json({ error: e });
  }
};

exports.getUsers = async (req, res) => {
  try {
    let user = await User.find({}, { password: 0 });

    res.status(201).json({
      status: 201,
      message: "Successfull",
      data: user,
    });
  } catch (e) {
    response(res, 401, null, null, e);
    res.json({ error: e });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    response(res, 401, null, null, "id is required");
  }

  try {
    let user = await User.findById(id, { password: 0, __v: 0 });

    if (user) {
      response(res, 201, "Successfull", user);
    } else {
      response(res, 404, "User not foudn");
    }
  } catch (e) {
    logger.error(e);
    response(res, 401, null, null, e);
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    response(res, 401, "id is required");
  }

  try {
    let user = await User.deleteOne({ _id: id }, { password: 0 });

    response(res, 201, "Successfull", user);
  } catch (e) {
    logger.error(e);
    response(res, 401, null, null, e);
  }
};
