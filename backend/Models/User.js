const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String, required: false, default: "" },

  // Inventory: items user owns with quantity
  inventory: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number, default: 1 },
    },
  ],

  // ItemDex: references to user's discovery progress
  item_dex: [{ type: mongoose.Schema.Types.ObjectId, ref: "ItemDex" }],

  stats: {
    luck: { type: Number, default: 0 },
    strength: { type: Number, default: 0 },
  },

  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);
