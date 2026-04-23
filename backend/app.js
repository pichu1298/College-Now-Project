const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
require("./DB/mongoose");
require("./DB/cloudinary");
const routes = require("./Routes/index");
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Parse JSON for requests with bodies (POST, PUT, PATCH)
app.use(express.json({ strict: false }));

// Your routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
