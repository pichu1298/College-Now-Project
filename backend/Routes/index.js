const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Example route
router.get("/", (req, res) => {
  res.send("Hello from routes!");
});

// User routes
router.post("/login", userController.login);

//server things below
const serverController = require("../controllers/serversController");

router.post("/servers", serverController.createServer);
router.get("/servers", serverController.getAllServers);
router.post("/servers/:serverId/users", serverController.addGameUserToServer);

// Export the router
module.exports = router;
