const mongoose = require("mongoose");

const gameUserSchema = new mongoose.Schema({
  display_name: { type: String, required: true },
  profile_picture: { type: String, required: false, default: "" },
  level: { type: Number, required: true, default: 1 },
  experience: { type: Number, required: true, default: 0 },
  inventory: [
    {
      item_id: String,
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  stats: {
    health: { type: Number, required: true, default: 100 },
    mana: { type: Number, required: true, default: 100 },
    physical_attack: { type: Number, required: true, default: 10 },
    agility: { type: Number, required: true, default: 10 },
    magical_attack: { type: Number, required: true, default: 10 },
  },
  assignable_stat_points: { type: Number, required: true, default: 0 },
});

module.exports =
  mongoose.models.GameUser || mongoose.model("GameUser", gameUserSchema);
