const Item = require("../Models/Item");
const User = require("../Models/User");
const ItemDex = require("../Models/ItemDex");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Simple login - creates new user if doesn't exist
exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });

    if (!user) {
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await user.save();
    }

    const token = signToken(user._id);
    res.json({ user, token });
  } catch (error) {
    console.error("Login error:", error); // Log the actual error
    res.status(500).json({ error: error.message });
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

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.fish = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "inventory",
      populate: { path: "itemId" },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const allItems = await Item.find();
    if (!allItems.length)
      return res.status(400).json({ message: "No items in DB" });

    // Total stats including buffs
    let totalStats = { ...user.stats };
    user.inventory.forEach((inventoryItem) => {
      (inventoryItem.itemId.buffs || []).forEach((buff) => {
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
    // Fix: push object with itemId and quantity, not just the ID
    const existingInventoryItem = user.inventory.find(
      (item) => item.itemId._id.toString() === fish._id.toString(),
    );

    if (existingInventoryItem) {
      existingInventoryItem.quantity += 1;
    } else {
      user.inventory.push({
        itemId: fish._id,
        quantity: 1,
      });
    }

    // Update ItemDex entry
    const itemDexEntry = await ItemDex.findOne({
      userId: user._id,
      itemId: fish._id,
    });

    if (itemDexEntry) {
      itemDexEntry.timesFished += 1;
      if (itemDexEntry.discovered === false) {
        itemDexEntry.discovered = true;
        itemDexEntry.discoveredAt = new Date();
      }
      await itemDexEntry.save();
    }

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
    req.body.createdById = userId;
    req.body.createdByName = user.username || "anonymous";

    const item = new Item(req.body);
    await item.save();

    // Add item to all users' item_dex
    const allUsers = await User.find();
    for (const u of allUsers) {
      const isCreator = u._id.equals(userId);
      const itemDexEntry = new ItemDex({
        userId: u._id,
        itemId: item._id,
        timesFished: 0,
        discovered: isCreator, // True only for the creator
        discoveredAt: isCreator ? new Date() : null,
      });
      await itemDexEntry.save();
      u.item_dex.push(itemDexEntry._id);
      await u.save();
    }

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addFriendToFriendList = async (req, res) => {
  try {
    const userId = req.params.id;
    const friendId = req.body.friendId;

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (userId === friendId) {
      return res
        .status(400)
        .json({ error: "You look lonely... No, you cannot add yourself" });
    }

    if (!user || !friend) {
      return res.status(404).json({ error: "User or friend not found" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ error: "Already friends" });
    }

    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend added successfully", user });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getFriendList = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("friends");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.friends.length === 0) {
      return res.status(200).json({
        message: "No friends found, you're lonely aren't you?",
        friends: [],
      });
    }

    res.status(200).json({ friends: user.friends });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getItemDex = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate({
      path: "item_dex",
      populate: { path: "itemId" },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ item_dex: user.item_dex });
  } catch (error) {
    res.status(500).json(error);
  }
};

const cloudinary = require("cloudinary").v2;

exports.changeProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await streamUpload();

    // Save result.secure_url to your DB here
    // e.g. user.profilePicture = result.secure_url

    res.json({
      message: "Profile picture updated",
      url: result.secure_url,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
