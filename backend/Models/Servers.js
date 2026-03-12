const mongoose = require("mongoose");
const GameUser = require("./GameUser");

const createDefaultGrid = () => {
  const grid = [];
  const width = 50;
  const height = 50;

  const farmlandXStart = 15; // roughly center
  const farmlandXEnd = 35;
  const farmlandYStart = 15;
  const farmlandYEnd = 35;

  const riverXStart = 45; // river on the right side
  const riverXEnd = 49;

  for (let x = 0; x < height; x++) {
    const row = [];
    for (let y = 0; y < width; y++) {
      // River on the right
      if (y >= riverXStart && y <= riverXEnd) {
        row.push({
          type: "water",
          crop: null,
          growth_stage: 0,
        });
      }
      // Farmland in the middle
      else if (
        x >= farmlandXStart &&
        x <= farmlandXEnd &&
        y >= farmlandYStart &&
        y <= farmlandYEnd
      ) {
        row.push({
          type: "farmland",
          crop: null,
          growth_stage: 0,
        });
      }
      // Grass everywhere else
      else {
        row.push({
          type: "grass",
          crop: null,
          growth_stage: 0,
        });
      }
    }
    grid.push(row);
  }
  return grid;
};

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
  users: [GameUser.schema],

  gridLand: { type: Array, default: createDefaultGrid() },
  daysSurvived: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Server", serverSchema);
