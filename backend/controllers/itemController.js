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
  console.log("getAllItems is running");
  try {
    req.body = {};
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
