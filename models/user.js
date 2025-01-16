const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  uid: { type: String, unique: true, required: true },
  username: { type: String },
  email: { type: String, unique: true, required: true },
  profilePicture: { type: String },
  authType: {
    type: String,
    enum: ["google", "email", "apple"],
    required: true,
  },
  google_id: { type: String, unique: true, sparse: true },
  apple_id: { type: String, unique: true, sparse: true },
  emailVerified: { type: Boolean, default: false },
  password: { type: String },
  createdAt: { type: Date, default: Date.Now, require: true },
  updatedAt: { type: Date, default: Date.Now, require: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
