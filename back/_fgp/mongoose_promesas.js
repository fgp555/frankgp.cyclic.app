const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI) //
  .then(console.log("✅ connect to database successful"));

mongoose
  .model("moviescollections", new mongoose.Schema({}))
  .find()
  .then((res) => console.log(res));
