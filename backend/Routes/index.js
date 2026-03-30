const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const itemController = require("../controllers/itemController");

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// User routes
router.get("/users", userController.getAllUsers);
router.post("/login", userController.login);

// Item routes
router.get("/items", itemController.getAllItems);

// User game actions
router.post("/users/:id/items", userController.createItem); // Make sure this exists
router.post("/users/:id/fish", userController.fish); // Make sure this exists

// Export the router
module.exports = router;
