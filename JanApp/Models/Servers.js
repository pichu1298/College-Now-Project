const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a server name",
  },
  password: {
    type: String,
    trim: false,
    required: "Please enter a server password",
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  daysSurvived: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Server", serverSchema);

// const shopSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     trim: true,
//     required: "Please enter a store name",
//   },
//   description: {
//     type: String,
//     trim: true,
//   },
//   tags: [String],
// });

// module.exports = mongoose.model("Shop", shopSchema);
