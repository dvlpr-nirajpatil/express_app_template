const User = require("../models/user");
const { response } = require("../utils/response");

exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      res.status(409).json({
        status: 409,
        message: "email address already exists",
      });
    } else {
      let user = new User({
        name: name,
        email: email,
        password: password,
      });

      user.save({ _id: 0, password: 0 });
      response(res, 201, "new user created", user);
      //   res.status(201).json({
      //     status: 201,
      //     message: "new user created",
      //     data: user,
      //   });
    }
  } catch (e) {
    console.log(`ERROR : ${e}`);
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
    console.log(`ERROR : ${e}`);
    res.json({ error: e });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(401).json({
      status: 401,
      message: "id is required",
    });
  }

  try {
    let user = await User.findById(id, { password: 0, __v: 0 });

    if (user) {
      res.status(201).json({
        status: 201,
        message: "Successfull",
        data: user,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "User not Found",
      });
    }
  } catch (e) {
    console.log(`ERROR : ${e}`);
    res.json({ error: e });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(401).json({
      status: 401,
      message: "id is required",
    });
  }

  try {
    let user = await User.deleteOne({ _id: id }, { password: 0 });

    res.status(201).json({
      status: 201,
      message: "Successfull",
      data: user,
    });
  } catch (e) {
    console.log(`ERROR : ${e}`);
    res.json({ error: e });
  }
};
