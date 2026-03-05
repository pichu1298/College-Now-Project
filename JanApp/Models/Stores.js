const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a store name",
  },
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
});

module.exports = mongoose.model("Shop", shopSchema);

const gameItem = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a game item name",
  },
  description: {
    type: String,
    trim: true,
  },
  rarity: {
    type: String,
    required: "Please enter a game item rarity",
  },
  type: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("GameItem", gameItem);
