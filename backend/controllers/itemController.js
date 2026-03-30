const Item = require("../Models/Item"); // Change 'Models' to 'models' if your folder is lowercase

exports.getAllItems = async (req, res) => {
  try {
    console.log("getAllItems is running");
    const items = await Item.find({});
    console.log("Items found:", items);
    res.status(200).json(items);
  } catch (error) {
    console.error("Error in getAllItems:", error);
    res.status(500).json({ error: error.message });
  }
};
