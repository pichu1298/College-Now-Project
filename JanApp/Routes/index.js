const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Example route
router.get("/", (req, res) => {
  res.send("Hello from routes!");
});

// Login route
router.post("/login", userController.login);

// Export the router
module.exports = router;
