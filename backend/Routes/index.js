const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const itemController = require("../controllers/itemController");
const verifyToken = require("../middleware/auth");

// Public routes
router.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

router.post("/login", userController.login);
router.get("/items", itemController.getAllItems);

// Protected routes - require token
router.get("/users", verifyToken, userController.getAllUsers);
router.get("/users/:id/friends", verifyToken, userController.getFriendList);
router.get("/users/:id/itemDex", verifyToken, userController.getItemDex);

router.post(
  "/users/:id/friends",
  verifyToken,
  userController.addFriendToFriendList,
);
router.post("/users/:id/items", verifyToken, userController.createItem);
router.post("/users/:id/fish", verifyToken, userController.fish);

// Export the router
module.exports = router;
