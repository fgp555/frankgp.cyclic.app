const express = require("express");
const mongoose = require("mongoose");

// // const app = express();
require("dotenv").config();

// var MONGO_URI = "mongodb+srv://user_tutorial:password_tutorial@cluster0.olzxglo.mongodb.net/";
var MONGO_URI = process.env.MONGO_URI;
// console.log(MONGO_URI)

var database = "temp";
var database = "moviesDB";
const moviesSchema = new mongoose.Schema({});
const MoviesModel = mongoose.model("moviescollections", moviesSchema);

const dbCon = async () => {
  await mongoose.connect(MONGO_URI + database);
  console.log("connect to database successful");
};

const getMovieService = async () => {
  const movieFind = await MoviesModel.find();
  console.log(movieFind);
  return movieFind;
};

const addMovieService = async () => {
  const movieFind = await MoviesModel.create({ title: "peli create" });
  console.log(movieFind);
  return movieFind;
};

const findByIdService = async () => {
  const movieFindById = await MoviesModel.findById("660ec23509b7113031bef9aa");
  console.log(movieFindById);
  return movieFindById;
};

const findOneService = async () => {
  const movieFindById = await MoviesModel.findOne({ title: "peli create" });
  console.log(movieFindById);
  return movieFindById;
};

// getMovieService();
// findByIdService()
// findOneService();
// addMovieService();

app.get("/movies", async (req, res) => {
  const getMovies = await getMovieService();
  res.json(getMovies);
});

dbCon().then((res) => {
  app.listen(3000, console.log("server start"));
});
