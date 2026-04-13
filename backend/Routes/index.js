const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const itemController = require("../controllers/itemController");

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

router.post("/login", userController.login);

// Item routes
router.get("/items", itemController.getAllItems);

// User routes

//gets
router.get("/users", userController.getAllUsers);
router.get("/users/:id/friends", userController.getFriendList);
router.get("/users/:id/itemDex", userController.getItemDex);

//post
router.post("/users/:id/friends", userController.addFriendToFriendList);
router.post("/users/:id/items", userController.createItem); //lets user create an item
router.post("/users/:id/fish", userController.fish); //fishes

// Export the router
module.exports = router;
