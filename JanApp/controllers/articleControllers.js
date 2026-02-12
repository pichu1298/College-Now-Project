exports.showArticles = (req, res) => {
  const articles = ["Article 1", "Article 2", "Article 3"];
  try {
    res.json(articles);
  } catch (error) {
    console.log(error);
  }
};
