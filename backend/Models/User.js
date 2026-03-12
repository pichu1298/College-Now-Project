const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String, required: false, default: "" },
});

module.exports = mongoose.model("User", userSchema);
