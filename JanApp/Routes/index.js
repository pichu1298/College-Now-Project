const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  res.json("Hello World");
});
// : = variable we can do stuff with

router.get("/articles/:title", (req, res) => {
  try {
    //attempts to run code, if no work we send to catch
    res.json(req.params.title);
  } catch (error) {}
});

module.exports = router;

// json = javascript object notation, universal for every language
