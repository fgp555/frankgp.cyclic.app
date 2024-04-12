// ========== config/dbCon.js ==========

const mongoose = require("mongoose");

require("dotenv").config();

// console.log(process.env.MONGO_URI);
var MONGO_URI = process.env.MONGO_URI;
var database = "test";
// var database = "moviesDB";
const dbCon = async () => {
  await mongoose.connect(MONGO_URI + database);
  console.log("✅ connect to database successful");
};

// ========== models/MoviesModel.js ==========
const moviesSchema = new mongoose.Schema({});
const MoviesModel = mongoose.model("moviescollections", moviesSchema);

// ========== services/movieService.js ==========
const getMovieService = async () => {
  const movieFind = await MoviesModel.find();
  console.log(movieFind);
  return movieFind;
};

const createMovieService = async () => {
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

// ========== controller/moviesControllers.js ==========

const getMoviesController = async (req, res) => {
  const getMovies = await getMovieService();
  res.json(getMovies);
};

const createMoviesController = async (req, res) => {
  const createMovies = await createMovieService();
  res.json(createMovies);
};

// ========== routes/router.js ==========

const router = require("express").Router();

router.get("/movies", getMoviesController);
router.post("/movies", createMoviesController);

// ========== server.js ==========
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);

// ========== index.js ==========

dbCon().then((res) => {
  app.listen(3000, console.log("🏠 server start in port 3000"));
});
