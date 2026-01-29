const express = require("express");
const port = process.env.PORT || 3000; //using a different port
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

//app.listen how to start server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
