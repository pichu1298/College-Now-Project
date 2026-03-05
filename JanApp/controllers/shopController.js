const Shop = require("../Models/Stores");
exports.createShop = async (req, res) => {
  try {
    const shop = new Shop(req.body);
    await shop.save();
    res.json(shop);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json(error);
  }
};
