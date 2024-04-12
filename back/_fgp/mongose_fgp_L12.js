// ========== config/dbCon.js ==========

const mongoose = require("mongoose");

require("dotenv").config();

var MONGO_URI = process.env.MONGO_URI;
// console.log(MONGO_URI);
var dbName = "test";
// var dbName = "moviesDB";
const dbCon = async () => {
  await mongoose.connect(MONGO_URI, { dbName: dbName });
  console.log("✅ connect to database successful");
};

// ========== models/MoviesModel.js ==========
const schema = {
  title: String,
  year: String,
  director: String,
  duration: String,
  genre: [String],
  rate: Number,
  poster: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};
// const moviesSchema = new mongoose.Schema(schema);
const moviesSchema = new mongoose.Schema({}, { strict: false });
const MoviesModel = mongoose.model("moviescollections", moviesSchema);

// ========== services/movieService.js ==========
const getMovieService = async () => {
  const movieFind = await MoviesModel.find().sort({ _id: -1 }).limit(0);
  console.log(movieFind);
  return movieFind;
};

const createMovieService = async (movieObject) => {
  const movieCreate = await MoviesModel.create(movieObject);
  console.log(movieCreate);
  return movieCreate;
};

const findByIdService = async (objectId) => {
  const movieFindById = await MoviesModel.findById(objectId);
  console.log(movieFindById);
  return movieFindById;
};

const findByTitleService = async (title) => {
  const movieFindOne = await MoviesModel.findOne({ title: title });
  console.log(movieFindOne);
  return movieFindOne;
};

// ========== middleware/utils/Helpers ==========
const createValidation = (req, res, next) => {
  const { title, year, poster } = req.body;
  if (!title.trim()) next({ message: "title is required", statusCode: 400 });
  if (!poster.trim()) next({ message: "poster is required", statusCode: 400 });
  // {return res.status(400).json({ message: "title is required" })};

  if (typeof year !== "number" || !Number.isInteger(year) || year.toString().length !== 4) {
    return res.status(400).json({ message: "year must have 4 digits" });
  }
  next();
};

const catchAsyncUtils = (controller) => {
  return (req, res, next) => {
    // controller(req, res).catch(next);
    controller(req, res).catch((err) => next(err));
  };
};

const addYearHelper = (n) => `${n} year`;

// ========== controller/moviesControllers.js ==========

const getMoviesController = async (req, res) => {
  const getMovies = await getMovieService();
  res.json(getMovies);
};

const createMoviesController = async (req, res) => {
  const movieObject = req.body;
  const createMovies = await createMovieService({ ...movieObject, year: addYearHelper(movieObject.year) });
  res.json(createMovies);
};

const getByIdController = async (req, res) => {
  const { id } = req.params;
  const getByIdService = await findByIdService(id);
  res.json(getByIdService);
};

// ========== routes/router.js ==========

const router = require("express").Router();

router.get("/movies", getMoviesController);
router.post("/movies", createValidation, catchAsyncUtils(createMoviesController));
router.get("/movies/:id", catchAsyncUtils(getByIdController));

// ========== server.js ==========
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message });
});

// ========== index.js ==========

dbCon().then(() => app.listen(3000, console.info("🏠 server start in port 3000")));
