const express = require("express");
const port = process.env.PORT || 3000; //using a different port
const app = express();

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

app.post("/", (req, res) => {
  res.send("POST request to the homepage");
});

app.get("/about", (req, res) => {
  res.send("GET request to the about page");
});

//app.listen how to start server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
