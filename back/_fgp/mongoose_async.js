const mongoose = require("mongoose");
const dbCon = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ connect to database successful");
};

// dbCon();

const moviesSchema = new mongoose.Schema({});
// const MoviesModel = mongoose.model("moviescollections", moviesSchema);

const findModel = async () => {
  const movieFind = await MoviesModel.find();
  console.log(movieFind);
};

// findModel();
