const mongoose = require("mongoose");

const itemDexSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
    unique: true,
  },
  timesFished: { type: Number, default: 1 },
  discovered: { type: Boolean, default: false },
  discoveredAt: { type: Date, default: null },
});

module.exports = mongoose.model("ItemDex", itemDexSchema);
