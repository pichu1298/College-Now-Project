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
