const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  strength_required: { type: Number, required: true },

  rarity: { type: String, required: true },
  buffs: [
    {
      stat: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
  createdBy: [
    {
      name: { type: String, default: "anonymous" },
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

module.exports = mongoose.model("Item", itemSchema);
