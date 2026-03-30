const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String, required: false, default: "" },

  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  stats: {
    luck: { type: Number, default: 0 },
    strength: { type: Number, default: 0 },
  },
  createdItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = mongoose.model("User", userSchema);
