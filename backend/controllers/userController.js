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
