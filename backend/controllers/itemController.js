const Item = require("../Models/Item");

exports.createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items); // Only send JSON once
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
