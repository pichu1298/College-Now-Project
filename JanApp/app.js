const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const routes = require("./Routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/", routes);
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
