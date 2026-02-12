exports.showMovies = (req, res) => {
  const movies = ["Star Wars", "Bill and Ted", "Next to Normal"];
  try {
    res.json(movies); // converts to json format
  } catch (error) {
    console.log(error);
  }
};
