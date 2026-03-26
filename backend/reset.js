require("dotenv").config({ path: "variables.env" });
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log(err));

const resetDB = async () => {
  await mongoose.connection.dropDatabase();
  console.log("Database cleared 🗑️");
  mongoose.connection.close();
};

resetDB();
