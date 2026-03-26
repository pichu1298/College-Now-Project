const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const itemController = require("../controllers/itemController");

// Example route
router.get("/", (req, res) => {
  res.send("Hello from routes!");
});

// User routes
router.post("/login", userController.login);
router.post("/users/:id/fish", userController.fish);

//Item routes
router.post("/items", itemController.createItem);

// Export the router
module.exports = router;
