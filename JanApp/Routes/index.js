const express = require("express");
const router = new express.Router();
router.get("/", (req, res) => {
  res.json("Hello World");
});
//access URl params

router.get("/articles/:title", (req, res) => {
  try {
    //attempt to run code, if no work we send to catch

    res.json(req.params.title);
  } catch (error) {}
});

router.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  res.json(`${username} is logged in`);
});
module.exports = router;
