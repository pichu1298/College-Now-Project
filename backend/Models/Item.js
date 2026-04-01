const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  strength_required: { type: Number, required: true },

  rarity: { type: String, required: false, default: "common" },
  buffs: [
    {
      stat: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdByName: {
    type: String,
    default: "anonymous",
  },
});

module.exports = mongoose.model("Item", itemSchema);
