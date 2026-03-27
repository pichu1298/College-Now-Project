const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
require("./DB/mongoose");
const routes = require("./Routes/index");

// Parse JSON for all requests
app.use(express.json());

// Your routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
