const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  uid: { type: String, required: true },
  refreshToken: { type: String, required: true },
  accessToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  device: { type: String },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
