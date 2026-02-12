const express = require("express");

const router = new express.Router();

const controller = {
  movieController: require("../controllers/movieController"),
  articleController: require("../controllers/articleControllers"),
};
router.get("/", controller.movieController.showMovies);

router.get("/articles/:title", controller.articleController.showArticles);
router.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  res.json(`${username} is logged in`);
});
module.exports = router;
