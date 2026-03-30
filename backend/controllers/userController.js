const Item = require("../Models/Item");
const User = require("../Models/User");

exports.login = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.fish = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("inventory");
    if (!user) return res.status(404).json({ message: "User not found" });

    const allItems = await Item.find();
    if (!allItems.length)
      return res.status(400).json({ message: "No items in DB" });

    // Total stats including buffs
    let totalStats = { ...user.stats };
    user.inventory.forEach((item) => {
      (item.buffs || []).forEach((buff) => {
        totalStats[buff.stat] = (totalStats[buff.stat] || 0) + buff.value;
      });
    });

    const userStrength = totalStats.strength || 0;
    const userLuck = totalStats.luck || 0;

    // Weighted rarity chance influenced by luck
    const baseRarityWeights = {
      common: 60,
      uncommon: 25,
      rare: 10,
      epic: 4,
      legendary: 1,
    };

    const luckBoost = Math.min(userLuck, 50); // cap the luck boost
    const weightedRarities = {
      common: Math.max(baseRarityWeights.common - luckBoost, 10),
      uncommon: baseRarityWeights.uncommon + luckBoost * 0.5,
      rare: baseRarityWeights.rare + luckBoost * 0.3,
      legendary: baseRarityWeights.legendary + luckBoost * 0.2,
    };

    // Roll for rarity
    const totalWeight = Object.values(weightedRarities).reduce(
      (a, b) => a + b,
      0,
    );
    let pick = Math.random() * totalWeight;
    let selectedRarity;
    for (let [rarity, weight] of Object.entries(weightedRarities)) {
      if (pick < weight) {
        selectedRarity = rarity;
        break;
      }
      pick -= weight;
    }

    // Pick random fish of that rarity
    const fishCandidates = allItems.filter((f) => f.rarity === selectedRarity);
    if (!fishCandidates.length) {
      return res
        .status(200)
        .json({ message: "No fish of that rarity found!", user });
    }
    const fish =
      fishCandidates[Math.floor(Math.random() * fishCandidates.length)];

    // Strength check
    if (userStrength < fish.strength_required) {
      return res.status(200).json({
        message: `You found a ${fish.rarity} fish (${fish.name}), but your strength (${userStrength}) is too low to catch it!`,
        fish,
        user,
      });
    }

    // Success: give fish
    user.inventory.push(fish._id);
    await user.save();

    res.status(200).json({
      message: `You caught a ${fish.rarity} fish!`,
      caught: fish,
      user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const buffsForRarity = {
  common: [1, 2, 3, 4, 5],
  uncommon: [6, 7, 8, 9, 10],
  rare: [11, 12, 13, 14, 15],
  epic: [16, 17, 18, 19, 20],
  legendary: [21, 22, 23, 24, 25],
};

const getRarityFromBuffValue = (totalValue) => {
  for (const [rarity, range] of Object.entries(buffsForRarity)) {
    if (totalValue >= range[0] && totalValue <= range[range.length - 1]) {
      return rarity;
    }
  }
  return "common";
};

exports.createItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const totalValueBuffs = req.body.buffs.reduce(
      (total, buff) => total + buff.value,
      0,
    );

    if (totalValueBuffs > 25) {
      return res.status(400).json({ error: "Total buffs value exceeds 25" });
    }

    req.body.rarity = getRarityFromBuffValue(totalValueBuffs);
    req.body.createdBy = user.username || "anonymous";

    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
};
