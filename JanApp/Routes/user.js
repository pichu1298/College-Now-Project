const express = require("express");
const router = new express.Router();
const userController = require("../controllers/userController");
router.post("/login", userController.login);
