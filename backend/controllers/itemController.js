const Item = require("../Models/Item");

const buffsForRarity = {
  common: [1, 2, 3, 4, 5],
  uncommon: [6, 7, 8, 9, 10],
  rare: [11, 12, 13, 14, 15],
  epic: [16, 17, 18, 19, 20],
  legendary: [21, 22, 23, 24, 25],
};

// helper to determine rarity from total buff value
const getRarityFromBuffValue = (totalValue) => {
  for (const [rarity, range] of Object.entries(buffsForRarity)) {
    if (totalValue >= range[0] && totalValue <= range[range.length - 1]) {
      return rarity;
    }
  }
  return "common"; // default fallback
};

exports.createItem = async (req, res) => {
  try {
    const totalValueBuffs = req.body.buffs.reduce(
      (total, buff) => total + buff.value,
      0,
    );

    if (totalValueBuffs > 25) {
      return res.status(400).json({ error: "Total buffs value exceeds 25" });
    }

    // auto-assign rarity based on total buff value
    req.body.rarity = getRarityFromBuffValue(totalValueBuffs);

    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllItems = async (req, res) => {
  console.log("getAllItems is running");
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
