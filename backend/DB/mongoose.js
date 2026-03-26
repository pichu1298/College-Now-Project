const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));
